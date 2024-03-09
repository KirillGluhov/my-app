namespace KeyTracingAPI.Models.DTO.Key
{
    public class BookedKeyInfoDTO
    {
        public Guid KeyId { get; set; }
        public List<BookingDTO> KeyBookings { get; set; }
    }
}
