using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Request
{
    public class GetListOfRequestsQuery
    {
        public List<Role> Roles { get; set; } = new List<Role>();
        public List<TimeSlot> TimeSlot { get; set; } = new List<TimeSlot>();
        public List<RequestStatus> Status { get; set; } = new List<RequestStatus>();

        public bool IsKeyRecieved { get; set; }
        public bool IsKeyReturned { get; set; }
        public bool IsRepetitive { get; set; }

        [EnumDataType(typeof(RequestSorting))]
        public RequestSorting Sorting { get; set; }
    }
}
