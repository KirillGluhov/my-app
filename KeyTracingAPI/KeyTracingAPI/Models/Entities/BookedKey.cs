using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.Entities
{
    public class BookedKey
    {
        public Guid UserId { get; set; }
        public Guid KeyId { get; set; }
        [Required]
        public DateOnly DateToBeBooked { get; set; }
        public TimeSlot TimeSlot { get; set; }

        public Guid RequestId { get; set; }
        public BookingKeyRequest BookingKeyRequest { get; set; } = null!;
    }
}
