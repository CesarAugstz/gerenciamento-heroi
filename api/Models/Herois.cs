using System.ComponentModel.DataAnnotations.Schema;
using api.Models.Common;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    [Index(nameof(NomeHeroi), IsUnique = true)]
    public class Herois : EntityBase
    {
        public required string Nome { get; set; }
        public required string NomeHeroi { get; set; }
        public DateTime? DataNascimento { get; set; }
        public required decimal Altura { get; set; }
        public required decimal Peso { get; set; }
        public virtual ICollection<HeroisSuperpoderes> HeroisSuperpoderes { get; set; } = null!;
    }
}