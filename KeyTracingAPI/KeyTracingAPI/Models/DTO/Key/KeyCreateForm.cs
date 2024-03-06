using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace KeyTracingAPI.Models.DTO.Key
{
    public class KeyCreateForm
    {
        //public Guid Building { get; set; }
        [Required]
        public string Auditory { get; set; }
    }
}
