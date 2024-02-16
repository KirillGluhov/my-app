using KeyTracingAPI.Validators;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.User
{
    public class UserRegisterModel
    {
        [Required]
        [PasswordValidation]
        public string password { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [MinLength(1)]
        [EmailAddress]
        public string Email { get; set; }
    }
}
