using api.Models.Common;

namespace api.Models
{
    public class Superpoderes: EntityBase
    {
        public required string Superpoder { get; set; }
        public string? Descricao { get; set; }
        public virtual ICollection<HeroisSuperpoderes> HeroisSuperpoderes { get; set; } = null!;
    }
}