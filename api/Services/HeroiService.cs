using api.Data;
using api.Dtos;
using api.Models;
using api.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class HeroiService : IHeroiService
    {
        private readonly IRepository<Herois> _repositorio;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public HeroiService(IRepository<Herois> repositorio, IMapper mapper, ApplicationDbContext context)
        {
            _repositorio = repositorio;
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<HeroiOutDto>> GetAllHeroisAsync(CancellationToken cancellationToken)
        {
            var herois = await _repositorio.Buscar(query: query => query.Include(h => h.HeroisSuperpoderes).ThenInclude(hs => hs.Superpoder), cancellationToken);

            return herois.Select(h => _mapper.Map<HeroiOutDto>(h));
        }

        public async Task<HeroiOutDto?> GetHeroiByIdAsync(int id, CancellationToken cancellationToken)
        {
            var heroi = await _repositorio.Buscar(query => query.Where(h => h.Id == id).Include(h => h.HeroisSuperpoderes).ThenInclude(hs => hs.Superpoder), cancellationToken);
            if (heroi == null) return null;
            return _mapper.Map<HeroiOutDto>(heroi);
        }

        public async Task<IEnumerable<SuperpoderDto?>> GetAllSuperpoderes(CancellationToken cancellationToken)
        {
            var superpoderes = await _context.Superpoderes.ToListAsync(cancellationToken);
            return superpoderes.Select(s => _mapper.Map<SuperpoderDto>(s));
        }

        public async Task<Herois> CreateHeroiAsync(HeroiDto heroi, CancellationToken cancellationToken)
        {
            var heroiExistente = await _repositorio.Buscar(
                query => query.Where(h => h.NomeHeroi == heroi.NomeHeroi),
                cancellationToken);

            if (heroiExistente.Any())
                throw new InvalidOperationException("Já existe um heroi com esse nome");

            var heroiMapeado = _mapper.Map<Herois>(heroi);

            heroiMapeado.HeroisSuperpoderes = new List<HeroisSuperpoderes>();
            foreach (var superpoderId in heroi.Superpoderes)
            {
                heroiMapeado.HeroisSuperpoderes.Add(new HeroisSuperpoderes
                {
                    HeroiId = heroiMapeado.Id,
                    SuperpoderId = superpoderId
                });
            }

            var createdHeroi = await _repositorio.AdicionarAsync(heroiMapeado, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return createdHeroi;
        }
        public async Task<bool> UpdateHeroiAsync(int id, HeroiDto heroi, CancellationToken cancellationToken)
        {
            var heroiExistente = await _context.Herois
                .Include(h => h.HeroisSuperpoderes)
                .FirstOrDefaultAsync(h => h.Id == id, cancellationToken);

            if (heroiExistente == null)
                return false;

            var heroiComMesmoNome = await _repositorio.Buscar(
                query => query.Where(h => h.NomeHeroi == heroi.NomeHeroi && h.Id != id),
                cancellationToken);

            if (heroiComMesmoNome.Any())
                throw new InvalidOperationException("Já existe um heroi com esse nome");

            _mapper.Map(heroi, heroiExistente);

            _context.HeroisSuperpoderes.RemoveRange(heroiExistente.HeroisSuperpoderes);
            await _context.SaveChangesAsync(cancellationToken);

            heroiExistente.HeroisSuperpoderes.Clear();
            foreach (var superpoderId in heroi.Superpoderes)
            {
                heroiExistente.HeroisSuperpoderes.Add(new HeroisSuperpoderes
                {
                    HeroiId = id,
                    SuperpoderId = superpoderId
                });
            }

            await _repositorio.AtualizarAsync(heroiExistente, cancellationToken);
            return true;
        }

        public async Task<bool> DeleteHeroiAsync(int id, CancellationToken cancellationToken)
        {
            return await _repositorio.DeletarAsync(id, cancellationToken);
        }
        public async Task<IEnumerable<HeroiOutDto>> SearchHeroisAsync(string term, CancellationToken cancellationToken)
        {
            var searchTerm = $"%{term}%";

            var herois = await _repositorio.Buscar(
                query => query
                    .Where(h => EF.Functions.Like(h.Nome, searchTerm) ||
                                EF.Functions.Like(h.NomeHeroi, searchTerm))
                    .OrderBy(h => h.Nome.StartsWith(term) ? 0 : 1)
                    .ThenBy(h => h.NomeHeroi)
                    .ThenBy(h => h.Nome)
                    .Include(h => h.HeroisSuperpoderes)
                    .ThenInclude(hs => hs.Superpoder),
                cancellationToken);

            return herois.Select(h => _mapper.Map<HeroiOutDto>(h));
        }
    }
}