using api.Models;

namespace api.Dtos
{
    public record class HeroiDto
    {
        public required string Nome { get; set; }
        public required string NomeHeroi { get; set; }
        public DateTime? DataNascimento { get; set; }
        public required decimal Altura { get; set; }
        public required decimal Peso { get; set; }
        public required List<int> Superpoderes { get; set; }
    }

    public record class HeroiOutDto
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required string NomeHeroi { get; set; }
        public DateTime? DataNascimento { get; set; }
        public decimal Altura { get; set; }
        public decimal Peso { get; set; }
        public List<SuperpoderDto>? Superpoderes { get; set; }
    }

    public record class SuperpoderDto
    {
        public required int Id { get; set; }
        public required string Superpoder { get; set; }
        public string? Descricao { get; set; }
    }

}
