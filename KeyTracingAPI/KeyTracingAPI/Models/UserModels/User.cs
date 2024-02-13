using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.UserModels
{
    public class User
    {
        [Key]
        public Guid NameId { get; set; }

        public string dbName { get; set; }

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
        public Gender Gender { get; set; }
        public DateTime? BirthDate { get; set; }

        public Guid? AddressId { get; set; }
        public string? phoneNumber { get; set; }
    }
}
