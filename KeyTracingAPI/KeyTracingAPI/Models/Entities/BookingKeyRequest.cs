using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.Models.ManyToMany;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.Entities
{
    public class BookingKeyRequest
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid KeyId { get; set; }
        public DateOnly DateToBeBooked { get; set; }
        public DateTime BookingDateTime { get; set; }
        public TimeSlot TimeSlot { get; set; }
        [Required]
        public string? Description { get; set; }
        public RequestStatus RequestStatus { get; set; } = RequestStatus.InProcess;
        public bool IsKeyRecieved { get; set; } = false;
        public bool IsKeyReturned { get; set; } = false;
        public bool IsRepetitive { get; set; } = false; 
        public BookedKey? BookedKeyInstance { get; set; }
        public User User { get; set; } = null!;
        public Key Key { get; set; } = null!;
    }
}
