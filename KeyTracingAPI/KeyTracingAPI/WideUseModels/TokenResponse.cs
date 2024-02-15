using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.WideUseModels
{
    public class TokenResponse
    {
        [Required(AllowEmptyStrings = false)]
        public string AccessToken { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
    }
}
