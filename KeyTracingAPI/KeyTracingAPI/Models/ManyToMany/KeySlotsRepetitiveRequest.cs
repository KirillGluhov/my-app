using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.Models.Enums;

namespace KeyTracingAPI.Models.ManyToMany
{
    public class KeySlotsRepetitiveRequest
    {
        public Guid KeyId { get; set; }
        public TimeSlot TimeSlot { get; set; }

        public List<Key> Keys { get; set; }
    }
}
