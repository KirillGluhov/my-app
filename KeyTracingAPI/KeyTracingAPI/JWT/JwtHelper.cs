using KeyTracingAPI.Models.Enums;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace KeyTracingAPI.JWT
{
    public static class JwtHelper
    {
        public static ClaimsIdentity GetClaimsIdentity(string login, Role userRole)
        {
            return new ClaimsIdentity(new[]
            {
                new Claim("UserLogin", login),
                new Claim("UserRole", userRole.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            });
        }

        public static string GetNewToken(string login, int lifeTime, Role userRole = Role.Student)
        {
            var issuer = JwtConfigurations.Issuer;
            var audience = JwtConfigurations.Audience;

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = GetClaimsIdentity(login, userRole),
                Issuer = issuer,
                Audience = audience,
                Expires = DateTime.UtcNow.AddMinutes(lifeTime),
                SigningCredentials = new SigningCredentials(JwtConfigurations.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return jwtToken;
        }

        public static JwtSecurityToken DecodeToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            return jwtToken;
        }
    }
}

