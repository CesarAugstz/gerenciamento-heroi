using api.Data;
using api.Dtos;
using api.Exceptions;
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
            var herois = await _repositorio.Buscar(
                query: query => query.Include(h => h.HeroisSuperpoderes).ThenInclude(hs => hs.Superpoder),
                cancellationToken
            );
            return herois.Select(h => _mapper.Map<HeroiOutDto>(h));
        }

        public async Task<HeroiOutDto> GetHeroiByIdAsync(int id, CancellationToken cancellationToken)
        {
            var heroi = await _repositorio.Buscar(
                query =>
                    query.Where(h => h.Id == id).Include(h => h.HeroisSuperpoderes).ThenInclude(hs => hs.Superpoder),
                cancellationToken
            );

            if (!heroi.Any())
                throw new HeroiNaoEncontradoException();

            return _mapper.Map<HeroiOutDto>(heroi.First());
        }

        public async Task<IEnumerable<SuperpoderDto>> GetAllSuperpoderes(CancellationToken cancellationToken)
        {
            var superpoderes = await _context.Superpoderes.ToListAsync(cancellationToken);
            if (!superpoderes.Any())
                throw new SuperpoderNaoEncontradoException();

            return superpoderes.Select(s => _mapper.Map<SuperpoderDto>(s));
        }

        public async Task<Herois> CreateHeroiAsync(HeroiDto heroi, CancellationToken cancellationToken)
        {
            var heroiExistente = await _repositorio.Buscar(
                query => query.Where(h => h.NomeHeroi == heroi.NomeHeroi),
                cancellationToken
            );

            if (heroiExistente.Any())
                throw new HeroiJaExisteException();

            if (string.IsNullOrEmpty(heroi.Nome) || string.IsNullOrEmpty(heroi.NomeHeroi))
                throw new HeroiInvalidoException("Nome e Nome do Herói são obrigatórios");

            var heroiMapeado = _mapper.Map<Herois>(heroi);
            heroiMapeado.HeroisSuperpoderes = heroi
                .Superpoderes.Select(id => new HeroisSuperpoderes { HeroiId = heroiMapeado.Id, SuperpoderId = id })
                .ToList();

            var createdHeroi = await _repositorio.AdicionarAsync(heroiMapeado, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return createdHeroi;
        }

        public async Task<bool> UpdateHeroiAsync(int id, HeroiDto heroi, CancellationToken cancellationToken)
        {
            var heroiExistente = await _context
                .Herois.Include(h => h.HeroisSuperpoderes)
                .FirstOrDefaultAsync(h => h.Id == id, cancellationToken);

            if (heroiExistente == null)
                throw new HeroiNaoEncontradoException();

            var heroiComMesmoNome = await _repositorio.Buscar(
                query => query.Where(h => h.NomeHeroi == heroi.NomeHeroi && h.Id != id),
                cancellationToken
            );

            if (heroiComMesmoNome.Any())
                throw new HeroiJaExisteException();

            if (string.IsNullOrEmpty(heroi.Nome) || string.IsNullOrEmpty(heroi.NomeHeroi))
                throw new HeroiInvalidoException("Nome e Nome do Herói são obrigatórios");

            _mapper.Map(heroi, heroiExistente);

            _context.HeroisSuperpoderes.RemoveRange(heroiExistente.HeroisSuperpoderes);
            await _context.SaveChangesAsync(cancellationToken);

            heroiExistente.HeroisSuperpoderes = heroi
                .Superpoderes.Select(superpoderId => new HeroisSuperpoderes
                {
                    HeroiId = id,
                    SuperpoderId = superpoderId,
                })
                .ToList();

            await _repositorio.AtualizarAsync(heroiExistente, cancellationToken);
            return true;
        }

        public async Task<bool> DeleteHeroiAsync(int id, CancellationToken cancellationToken)
        {
            var deleted = await _repositorio.DeletarAsync(id, cancellationToken);
            if (!deleted)
                throw new HeroiNaoEncontradoException();

            return true;
        }

        public async Task<IEnumerable<HeroiOutDto>> SearchHeroisAsync(string term, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(term))
                throw new HeroiInvalidoException("Termo de busca não pode ser vazio");

            var searchTerm = $"%{term}%";
            var herois = await _repositorio.Buscar(
                query =>
                    query
                        .Where(h => EF.Functions.Like(h.Nome, searchTerm) || EF.Functions.Like(h.NomeHeroi, searchTerm))
                        .OrderBy(h => h.Nome.StartsWith(term) ? 0 : 1)
                        .ThenBy(h => h.NomeHeroi)
                        .ThenBy(h => h.Nome)
                        .Include(h => h.HeroisSuperpoderes)
                        .ThenInclude(hs => hs.Superpoder),
                cancellationToken
            );

            return herois.Select(h => _mapper.Map<HeroiOutDto>(h));
        }
    }
}
