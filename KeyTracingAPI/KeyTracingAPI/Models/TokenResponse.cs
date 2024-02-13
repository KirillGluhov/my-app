using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models
{
    public class TokenResponse
    {
        [Key]
        [Required]
        [MinLength(1)]
        public string Token { get; set; }

        public TokenResponse(string Token) {
            this.Token = Token;
        }
        public TokenResponse() { }
    }
}
