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

        public async Task<IEnumerable<Herois>> GetAllHeroisAsync(CancellationToken cancellationToken)
        {
            return await _repositorio.BuscarTodosAsync(cancellationToken);
        }

        public async Task<Herois?> GetHeroiByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await _repositorio.BuscarPorIdAsync(id, cancellationToken);
        }

        public async Task<Herois> CreateHeroiAsync(HeroiDto heroi, CancellationToken cancellationToken)
        {
            var heroiExistente = await _repositorio.Buscar(
                query => query.Where(h => h.NomeHeroi == heroi.NomeHeroi), 
                cancellationToken);

            if (heroiExistente.Any())
                throw new InvalidOperationException("Já existe um heroi com esse nome");

            var heroiMapeado = _mapper.Map<Herois>(heroi);
            return await _repositorio.AdicionarAsync(heroiMapeado, cancellationToken);
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
    }
}
