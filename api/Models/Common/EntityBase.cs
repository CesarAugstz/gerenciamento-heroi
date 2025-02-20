using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models.Common
{
    public abstract class EntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        // TODO: setar datas de criação e alteração e rotina de atualizacao de datas
        // public required DateTime DataCriacao { get; set; }
        // public required DateTime DataAlteracao { get; set; }
    }
}