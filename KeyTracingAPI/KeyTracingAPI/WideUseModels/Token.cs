using KeyTracingAPI.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.WideUseModels
{
    public class Token
    {
        public string RefreshToken { get; set; } = null!;
        public string AccessToken { get; set; } = null!;

        [Key]
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
