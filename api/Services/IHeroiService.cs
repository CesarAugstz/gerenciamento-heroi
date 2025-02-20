using api.Dtos;
using api.Models;

namespace api.Services
{
    public interface IHeroiService
    {
        Task<IEnumerable<Herois>> GetAllHeroisAsync(CancellationToken cancellationToken);
        Task<Herois?> GetHeroiByIdAsync(int id, CancellationToken cancellationToken);
        Task<Herois> CreateHeroiAsync(HeroiDto heroi, CancellationToken cancellationToken);
        Task<bool> UpdateHeroiAsync(int id, HeroiDto heroi, CancellationToken cancellationToken);
        Task<bool> DeleteHeroiAsync(int id, CancellationToken cancellationToken);
    }
}
