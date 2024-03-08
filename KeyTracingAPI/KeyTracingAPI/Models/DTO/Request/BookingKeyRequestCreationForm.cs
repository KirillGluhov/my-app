using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.Validators;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Request
{
    public class BookingKeyRequestCreationForm
    {
        public Guid KeyId { get; set; }
        [RequestDateValidation]
        public DateOnly DateToBeBooked { get; set; }
        public TimeSlot TimeSlot { get; set; }
        [Required]
        public string? Description { get; set; }
        public bool IsRepetetive {  get; set; }
        public DateTime BookingDateTime = DateTime.UtcNow;
    }
}
