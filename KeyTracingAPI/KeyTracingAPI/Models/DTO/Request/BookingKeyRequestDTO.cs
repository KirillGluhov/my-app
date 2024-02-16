using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Request
{
    public class BookingKeyRequestDTO
    {
        public DateOnly BookingDate { get; set; }
        public TimeSlot TimeSlot { get; set; }
        [Required]
        public string? Description { get; set; }
    }
}
