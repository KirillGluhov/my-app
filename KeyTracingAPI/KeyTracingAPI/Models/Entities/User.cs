using KeyTracingAPI.Validators;
using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;
using KeyTracingAPI.WideUseModels;
using KeyTracingAPI.Models.ManyToMany;

namespace KeyTracingAPI.Models.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string FullName { get; set; }
        public string NormalizedName { get; set; }

        [PasswordValidation]
        public string Password { get; set; }

        [Required]
        [MinLength(1)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public Role UserRole { get; set; } = Role.Student;

        public Token? UserToken { get; set; }
        public ICollection<BookingKeyRequest> UserSlots { get; } = new List<BookingKeyRequest>();
    }
}
