using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Request
{
    public class BookingKeyRequestCreationForm
    {
        public Guid UserId { get; set; }
        public Guid KeyId { get; set; }
        public DateTime BookingDateTime { get; set; }
        public DateOnly DateToBeBooked { get; set; }
        public TimeSlot TimeSlot { get; set; }
        [Required]
        public string? Description { get; set; }
    }
}
