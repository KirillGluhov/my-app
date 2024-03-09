using KeyTracingAPI.Models.Enums;

namespace KeyTracingAPI.Models.DTO.Key
{
    public class BookingDTO
    {
        public Guid UserId { get; set; }
        public DateOnly DateToBeBooked { get; set; }
        public TimeSlot TimeSlot { get; set; }
    }
}
