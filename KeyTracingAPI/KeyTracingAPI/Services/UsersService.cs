using KeyTracingAPI.Models;
using KeyTracingAPI.Models.Exceptions;
using KeyTracingAPI.Models.UserModels;
using KeyTracingAPI.Services.Interfaces;
using KeyTracingAPI.Services.Middleware;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Xml.Linq;


namespace KeyTracingAPI.Services
{
    public class UsersService : IUsersService
    {
        private readonly AppDbContext _context;
        private readonly TokenValidationMiddleware _tokenValidation;

        public UsersService(AppDbContext context, TokenValidationMiddleware tokenValidation)
        {
            _context = context;
            _tokenValidation = tokenValidation;
        }

        private async Task<bool> _IsInDb(User user)
        {
            if (user == null)
            {
                return true; 
            }

            var temp = await _context.Users.SingleOrDefaultAsync(h => h.dbName == user.email);

            return temp == null;
        }
        public async Task<ActionResult<TokenResponse>> Register(User user)
        {
            if (!_IsInDb(user).Result)
            {
                throw new BadRequestException("user with that email is already in database");
            }

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var result = await Login(new LoginCredentials
            {
                email = user.email,
                password = user.password,
            });

            return result;
        }
        public async Task<ActionResult<TokenResponse>> Login(LoginCredentials login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.email == login.email);

            if (user == null)
            {
                throw new InvalidLoginException();
            }

            if (user.password != login.password)
            {
                throw new BadRequestException("wrong password, pls try again");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("123123132321312321312321");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = "DeliveryService",
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, login.email)
                }),
                Audience = "123"
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            TokenResponse result = new TokenResponse(tokenHandler.WriteToken(token));

            return result;
        }

        public async Task Logout(string token)
        {
            await _tokenValidation.IsTokenValid(token);

            await _context.BanedTokens.AddAsync(new Token(token));
            await _context.SaveChangesAsync();
        }

        public async Task<UserDTO> GetProfile(string dbName, string token)
        {
            await _tokenValidation.IsTokenValid(token);

            var temp = await _context.Users.SingleOrDefaultAsync(h => h.dbName == dbName);

            if (temp == null) 
            {
                throw new InvalidLoginException();
            }

            return new UserDTO
            {
                FullName = temp.FullName,
                BirthDate = temp.BirthDate,
                Gender = temp.Gender.ToString(),
                Phone = temp.phoneNumber,
                Email = temp.email,
                Address = temp.AddressId
            };

        }

        public async Task EditProfile(UserEditModel user, string dbName, string token)
        {
            await _tokenValidation.IsTokenValid(token);

            var temp = await _context.Users.SingleOrDefaultAsync(h => h.dbName == dbName);
            if (temp == null)
            {
                throw new InvalidLoginException();
            }

            temp.FullName = user.FullName;
            temp.BirthDate = user.BirthDate;
            temp.Gender = user.Gender;
            temp.AddressId = user.AddressId;
            temp.phoneNumber = user.phoneNumber;

            await _context.SaveChangesAsync();
        }
    }
}
