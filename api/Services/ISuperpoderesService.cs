using api.Dtos;

namespace api.Services
{
    public interface ISuperpoderesService
    {
        Task<IEnumerable<SuperpoderDto>> GetAllSuperpoderesAsync(CancellationToken cancellationToken);
    }
}
