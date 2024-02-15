using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.ManyToMany
{
    public class BookingKeyRequest
    {
        public Guid UserId { get; set; }
        public Guid KeyId { get; set; }
        public DateOnly BookingDate { get; set; }
        public TimeSlot TimeSlot { get; set; }
        [Required]
        public string Description { get; set; }
        public RequestStatus RequestStatus { get; set; } = RequestStatus.InProcess;
        public bool IsKeyRecieved { get; set; } = false;
        public bool IsKeyReturned { get; set; } = false;
    }
}
