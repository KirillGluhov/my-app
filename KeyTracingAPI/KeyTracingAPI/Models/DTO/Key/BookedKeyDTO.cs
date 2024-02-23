using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Key
{
    public class BookedKeyDTO
    {
        public Guid UserId { get; set; }
        public Guid KeyId { get; set; }
        [Required]
        public DateOnly DateToBeBooked { get; set; }
        public TimeSlot TimeSlot { get; set; }
    }
}
