using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.User
{
    public class UserDTOForPrincipal
    {
        public Guid Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [MinLength(1)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public Role UserRole { get; set; }
    }
}
