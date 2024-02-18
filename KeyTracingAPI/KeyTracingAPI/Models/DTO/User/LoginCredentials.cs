using KeyTracingAPI.Validators;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.User
{
    public class LoginCredentials
    {
        [Required]
        [MinLength(1)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [PasswordValidation]
        public string Password { get; set; }
    }
}
