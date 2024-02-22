using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.Models.Enums;

namespace KeyTracingAPI.Models.ManyToMany
{
    public class KeySlotsRepetitiveRequest
    {
        public Guid UserId { get; set; }
        public Guid KeyId { get; set; }
        public TimeSlot TimeSlot { get; set; }
    }
}
