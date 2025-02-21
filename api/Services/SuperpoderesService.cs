using api.Data;
using api.Dtos;
using api.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class SuperpoderesService(ApplicationDbContext context, IMapper mapper) : ISuperpoderesService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<SuperpoderDto>> GetAllSuperpoderesAsync(CancellationToken cancellationToken)
        {
            var superpoderes = await _context.Superpoderes.ToListAsync(cancellationToken);
            if (!superpoderes.Any())
                throw new SuperpoderNaoEncontradoException();

            return superpoderes.Select(s => _mapper.Map<SuperpoderDto>(s));
        }
    }
}
