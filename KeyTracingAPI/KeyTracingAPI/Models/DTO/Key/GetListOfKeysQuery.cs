using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Key
{
    public class GetListOfKeysQuery
    {
        public List<TimeSlot> Roles { get; } = new List<TimeSlot>();
        public string Auditory { get; set; }
        public bool IsInPrincipal {  get; set; } //добавлять BookedKey

        [EnumDataType(typeof(RequestSorting))]
        public RequestSorting Sorting { get; set; }
    }
}
