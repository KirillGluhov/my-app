using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Key
{
    public class KeyDTO
    {
        public Guid Building { get; set; }
        public string Auditory { get; set; }
        public DateOnly BookingDate { get; set; }
        public TimeSlot TimeSlot { get; set; }
        public bool IsInPrincipalOffice { get; set; } = true;
    }
}
