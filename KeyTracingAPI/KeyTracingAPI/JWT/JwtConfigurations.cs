using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace KeyTracingAPI.JWT
{
    public class JwtConfigurations
    {
        public const string Issuer = "Issuer";
        public const string Audience = "Audience";
        public const string Key = "Keydfffffffffffffffffffffffffffffffffdffffffffffffffff2135dsssssssssssssdf";
        public const int AccessLifeTime = 60;
        public const int RefreshLifeTime = AccessLifeTime * 24;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}
