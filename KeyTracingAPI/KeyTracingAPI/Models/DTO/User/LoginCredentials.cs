using KeyTracingAPI.Validators;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.User
{
    public class LoginCredentials
    {
        [Required]
        [MinLength(1)]
        [EmailAddress]
        public string email { get; set; }

        //public string NormalizedName { get; set; }

        [Required]
        [PasswordValidation]
        public string password { get; set; }
    }
}
