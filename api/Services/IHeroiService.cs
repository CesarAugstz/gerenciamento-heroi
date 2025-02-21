using api.Dtos;
using api.Models;

namespace api.Services
{
    public interface IHeroiService
    {
        Task<IEnumerable<HeroiOutDto>> GetAllHeroisAsync(CancellationToken cancellationToken);
        Task<HeroiOutDto> GetHeroiByIdAsync(int id, CancellationToken cancellationToken);
        Task<IEnumerable<SuperpoderDto>> GetAllSuperpoderes(CancellationToken cancellationToken);
        Task<Herois> CreateHeroiAsync(HeroiDto heroi, CancellationToken cancellationToken);
        Task<bool> UpdateHeroiAsync(int id, HeroiDto heroi, CancellationToken cancellationToken);
        Task<bool> DeleteHeroiAsync(int id, CancellationToken cancellationToken);
        Task<IEnumerable<HeroiOutDto>> SearchHeroisAsync(
            string term,
            CancellationToken cancellationToken
        );
    }
}
