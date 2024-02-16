using KeyTracingAPI.Validators;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.User
{
    public class UserEditModel
    {
        [Required]
        [PasswordValidation]
        public string password { get; set; }

        [Required]
        public string FullName { get; set; }
    }
}
