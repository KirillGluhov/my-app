using KeyTracingAPI.Models.DTO.Key;
using KeyTracingAPI.Models.DTO.User;
using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Request
{
    public class BookingKeyRequestDTOForPrincipal
    {
        public UserDTO User { get; set; } = null!;
        public KeyDTO Key { get; set; } = null!;
        public DateOnly BookingDate { get; set; }
        public TimeSlot TimeSlot { get; set; }
        [Required]
        public string? Description { get; set; }
        public Guid RequestId { get; set; }
        [EnumDataType(typeof(RequestStatus))]
        public RequestStatus RequestStatus { get; set; }
    }
}
