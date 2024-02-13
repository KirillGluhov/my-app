using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.UserModels
{
    public class UserEditModel
    {
        [Required]
        [MinLength(1)]
        public string FullName { get; set; }
        public DateTime? BirthDate { get; set; }

        [Required]
        [EnumDataType(typeof(Gender))]
        public Gender Gender { get; set; }
        public Guid? AddressId { get; set; }
        public string? phoneNumber { get; set; }
    }
}
