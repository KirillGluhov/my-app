using KeyTracingAPI.Models.DTO.Key;
using KeyTracingAPI.Models.DTO.User;
using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Request
{
    public class BookingKeyRequestDTOForUser
    {
        public KeyDTO Key { get; set; } = null!;
        public DateOnly BookingDate { get; set; }
        public TimeSlot TimeSlot { get; set; }
        [Required]
        public string? Description { get; set; }
        [EnumDataType(typeof(RequestStatus))]
        public RequestStatus RequestStatus { get; set; }
        public Guid RequestId { get; set; }

        public bool IsKeyRecieved { get; set; }
        public bool IsKeyReturned { get; set; }
        public bool IsRepetitive { get; set; }
    }
}
