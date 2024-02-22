using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Request
{
    public class GetListOfRequestsQuery
    {
        public List<Role> Roles { get; set; } = new List<Role>();
        public List<TimeSlot> TimeSlot { get; set; } = new List<TimeSlot>();
        public bool IsKeyRecieved { get; set; }
        public bool IsKeyReturned { get; set; }

        [EnumDataType(typeof(RequestSorting))]
        public RequestSorting Sorting { get; set; }

        [EnumDataType(typeof(RequestStatus))]
        public RequestStatus Status { get; set; }
    }
}
