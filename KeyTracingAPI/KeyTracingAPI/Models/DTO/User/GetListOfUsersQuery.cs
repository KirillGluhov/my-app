using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.User
{
    public class GetListOfUsersQuery
    {
        public List<Role> Roles { get; set; } = new List<Role>();
        public string? Name { get; set; }
        public bool hasRequests { get; set; } //?
    }
}
