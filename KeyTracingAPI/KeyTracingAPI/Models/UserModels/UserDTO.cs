using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.UserModels
{
    public class UserDTO
    {
        [Required]
        [MinLength(1)]
        public string FullName { get; set; }
        public DateTime? BirthDate { get; set; }

        [Required]
        [EnumDataType(typeof(Gender))]
        public string Gender { get; set; }

        public string? Phone { get; set; }

        [Required]
        [MinLength(1)]
        [EmailAddress]
        public string Email { get; set; }

        public Guid? Address { get; set; }
    }
}
