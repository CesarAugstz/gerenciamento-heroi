using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SuperpoderesController(ISuperpoderesService superpoderesService) : ControllerBase
    {
        private readonly ISuperpoderesService _superpoderesService = superpoderesService;

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var superpoderes = await _superpoderesService.GetAllSuperpoderesAsync(cancellationToken);
            return Ok(superpoderes);
        }
    }
}
