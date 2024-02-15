using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.Entities
{
    public class Key
    {
        public Guid Id { get; set; }
        public Guid Building { get; set; }
        public string Auditory { get; set; }
        public bool IsInPrincipalOffice { get; set; } = true;
    }
}
