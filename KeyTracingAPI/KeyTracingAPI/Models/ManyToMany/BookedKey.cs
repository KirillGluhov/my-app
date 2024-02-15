using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.ManyToMany
{
    public class BookedKey
    {
        public Guid UserId { get; set; }
        public Guid KeyId { get; set; }
        [Required]
        public DateOnly BookingDate { get; set; }
        public TimeSlot TimeSlot { get; set; }
    }
}
