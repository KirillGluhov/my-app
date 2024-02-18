using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.Validators;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.User
{
    public class UserDTO
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        [MinLength(1)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [PasswordValidation]
        public string Password { get; set; }

        [Required]
        public Role UserRole { get; set; }
    }
}
