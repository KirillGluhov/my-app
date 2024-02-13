using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.UserModels
{
    public class UserRegisterModel
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        [MinLength(1)]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        [MinLength(6)]
        public string password { get; set; }

        [Required]
        //[EnumDataType(typeof(Gender))]
        public string Gender { get; set; }
        public DateTime? BirthDate { get; set; }

        public Guid? AddressId { get; set; }
        public string? phoneNumber { get; set; }
    }
}
