using api.Models.Common;

namespace api.Models
{
    public class HeroisSuperpoderes : EntityBase
    {
        public required int HeroiId { get; set; }
        public required int SuperpoderId { get; set; }
        public virtual Herois Heroi { get; set; } = null!;
        public virtual Superpoderes Superpoder { get; set; } = null!;
    }
}
