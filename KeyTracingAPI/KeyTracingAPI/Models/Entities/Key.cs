using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.Models.ManyToMany;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.Entities
{
    public class Key
    {
        public Guid Id { get; set; }
        //public Guid Building { get; set; } pod voprosom
        public string Auditory { get; set; }
        public bool IsInPrincipalOffice { get; set; } = true;

        public ICollection<BookingKeyRequest> KeySlots { get; } = new List<BookingKeyRequest>();
    }
}
