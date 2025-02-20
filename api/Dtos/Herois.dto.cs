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
}
