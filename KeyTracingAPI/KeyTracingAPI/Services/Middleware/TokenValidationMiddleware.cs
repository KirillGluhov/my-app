using KeyTracingAPI.Models;
using KeyTracingAPI.Models.Exceptions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace KeyTracingAPI.Services.Middleware
{
    public class TokenValidationMiddleware
    {
        private readonly AppDbContext _context;
        public TokenValidationMiddleware(AppDbContext context)
        {
            _context = context;
        }

        public async Task IsTokenValid(HttpContext context)
        {
            var token = await context.GetTokenAsync("access_token");

            if (token == null)
            {
                throw new InvalidTokenException("Token not found");
            }

            await IsTokenValid(token);
        }

        public async Task IsTokenValid(string token)
        {
            var alreadyExistsToken = await _context.BanedTokens.FirstOrDefaultAsync(x => x.token == token);

            if (alreadyExistsToken != null)
            {
                throw new InvalidTokenException();
            }
        }
    }
}
