using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.Validators;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Key
{
    public class GetListOfKeysQuery
    {
        public List<TimeSlot> TimeSlots { get; } = new List<TimeSlot>();
        [PeriodValidation]
        public KeyValuePair<DateOnly, DateOnly> Period { get; set; }
        public bool? IsInPrincipal { get; set; } //добавлять BookedKey

        [EnumDataType(typeof(KeySorting))]
        public KeySorting Sorting { get; set; }
    }
}
