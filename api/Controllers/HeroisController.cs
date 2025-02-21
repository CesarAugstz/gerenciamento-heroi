using Microsoft.AspNetCore.Mvc;
using api.Dtos;
using api.Services;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HeroisController : ControllerBase
{
    private readonly IHeroiService _heroiService;

    public HeroisController(IHeroiService heroiService)
    {
        _heroiService = heroiService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var herois = await _heroiService.GetAllHeroisAsync(cancellationToken);
        return Ok(herois);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var heroi = await _heroiService.GetHeroiByIdAsync(id, cancellationToken);
        if (heroi == null) return NotFound("Heroi não encontrado");
        return Ok(heroi);
    }

    [HttpGet("superpoderes")]
    public async Task<IActionResult> GetAllSuperpoderes(CancellationToken cancellationToken)
    {
        var superpoderes = await _heroiService.GetAllSuperpoderes(cancellationToken);
        return Ok(superpoderes);
    }

    [HttpPost]
    public async Task<IActionResult> Create(HeroiDto heroi, CancellationToken cancellationToken)
    {
        try
        {
            var heroiCriado = await _heroiService.CreateHeroiAsync(heroi, cancellationToken);
            return Created();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, HeroiDto heroi, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _heroiService.UpdateHeroiAsync(id, heroi, cancellationToken);
            if (!result) return NotFound("Heroi não encontrado");
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var result = await _heroiService.DeleteHeroiAsync(id, cancellationToken);
        if (!result) return NotFound("Heroi não encontrado");
        return NoContent();
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string term, CancellationToken cancellationToken)
    {
        var herois = await _heroiService.SearchHeroisAsync(term, cancellationToken);
        return Ok(herois);
    }

}