using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models
{
    public class Token
    {
        [Key]
        [Required]
        [MinLength(1)]
        public string token { get; set; }
        public DateTime expiredtime { get; set; }

        public Token(string token)
        {
            this.token = token;
            expiredtime = DateTime.UtcNow;
        }
        public Token() { }
    }
}
