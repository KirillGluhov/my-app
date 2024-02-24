using KeyTracingAPI.Database;
using KeyTracingAPI.JWT;
using KeyTracingAPI.Models.DTO.User;
using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.Models.Exceptions;
using KeyTracingAPI.Services.Interfaces;
using KeyTracingAPI.WideUseModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace KeyTracingAPI.Services
{
    public class UserServices: IUserService
    {
        private readonly AppDbContext _context;
        public UserServices(AppDbContext context)
        {
            _context = context;
        }
        private async Task<bool> _IsUserInDb(User user)
        {
            if (user == null)
                return false;

            var temp = await _context.Users.SingleOrDefaultAsync(h => h.Email == user.Email);

            return !(temp == null);
        }

        private async Task _IsTokenValid(string token)
        {
            var alreadyExistsToken = await _context.Tokens.FirstOrDefaultAsync(x => x.AccessToken == token);

            if (alreadyExistsToken == null)
            {
                throw new InvalidTokenException();
            }
        }
        private async Task<UserDTOForPrincipal> UserMapperForPrincipal(User user)
        {
            return new UserDTOForPrincipal
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                UserRole = user.UserRole
            };
        }
        private async Task<UserDTO> UserMapper(User user)
        {
            return new UserDTO
            {
                FullName = user.FullName,
                Email = user.Email,
                UserRole = user.UserRole
            };
        }
        private async Task<List<UserDTOForPrincipal>> UserListMapper(List<User> user)
        {
            List<UserDTOForPrincipal> usersDTO = new List<UserDTOForPrincipal>();
            for (int i = 0; i < user.Count; i++)
            {
                usersDTO.Add(UserMapperForPrincipal(user[i]).Result);
            }
            return usersDTO;
        }

        public async Task<ActionResult<TokenResponse>> Register(UserRegisterModel userDto)
        {
            var user = new User
            {
                Id = new Guid(),
                NormalizedName = userDto.FullName,
                FullName = userDto.FullName.Normalize(),
                Email = userDto.Email,
                Password = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(userDto.password)))
            };

            if (_IsUserInDb(user).Result)
            {
                throw new BadRequestException("user with that email is already in database");
            }

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var result = await Login(new LoginCredentials
            {
                Email = user.Email,
                Password = user.Password,
            });

            return result;
        }
        public async Task<ActionResult<TokenResponse>> Login(LoginCredentials login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == login.Email);

            if (user == null)
                throw new InvalidLoginException();

            if (user.Password != login.Password)
                throw new BadRequestException("wrong password, pls try again");

            var temp = await _context.Tokens.SingleOrDefaultAsync(h => h.UserId == user.Id);

            if (temp != null)
            {
                _context.Tokens.Remove(temp);
                await _context.SaveChangesAsync();
            }
               

            var token1 = JwtHelper.GetNewToken(login.Email, JwtConfigurations.AccessLifeTime, user.UserRole);
            var token2 = JwtHelper.GetNewToken(login.Email, JwtConfigurations.RefreshLifeTime, user.UserRole);

            await _context.Tokens.AddAsync(new Token { AccessToken = token1, RefreshToken = token2, UserId = user.Id });
            await _context.SaveChangesAsync();

            TokenResponse result = new TokenResponse();
            result.AccessToken = token1;

            return result;
        }

        public async Task<ActionResult<Response>> Logout(string token)
        {
            await _IsTokenValid(token);

            var temp = await _context.Tokens.SingleOrDefaultAsync(h => h.AccessToken == token);

            if (temp == null)
                throw new InvalidLoginException();

            _context.Tokens.Remove(temp);
            await _context.SaveChangesAsync();
            return new Response
            {
                Message = $"Succesfully logout"
            };
        }

        public async Task<UserDTO> GetProfile(string Email)
        {
            var temp = await _context.Users.SingleOrDefaultAsync(h => h.Email == Email);

            if (temp == null)
                throw new InvalidLoginException();

            return await UserMapper(temp);
        }

        public async Task<ActionResult<Response>> EditProfile(UserEditModel user, string Email)
        {
            var temp = await _context.Users.SingleOrDefaultAsync(h => h.Email == Email);

            if (temp == null)
                throw new InvalidLoginException();

            temp.FullName = user.FullName;
            temp.NormalizedName = user.FullName.Normalize();
            temp.Password = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(user.password)));

            await _context.SaveChangesAsync();
            return new Response
            {
                Message = $"Profile succesfully edited"
            };
        }

        public async Task<ActionResult<List<UserDTOForPrincipal>>> GetUsers(GetListOfUsersQuery query)
        {
            var totalUsersCount = await _context.Users.CountAsync();

            if (totalUsersCount == 0)
                throw new Exception("totalUsersCount was 0");

            var userQuery = _context.Users.Where(d => query.Roles.Contains((Role)d.UserRole));

            if (query.hasRequests)
                userQuery = userQuery.Where(u => u.UserSlots.Any());

            if (query.Name != null)
                userQuery = userQuery.Where(model => EF.Functions.ILike(model.NormalizedName, "%" + query.Name + "%"));
            
            var usersList = await userQuery.ToListAsync();

            return await UserListMapper(usersList);
        }

        public async Task<ActionResult<Response>> ChangeRole(Guid userId, Role role, string email)
        {
            var user = await _context.Users.SingleOrDefaultAsync(h => h.Id == userId);
            var admin = await _context.Users.SingleOrDefaultAsync(h => h.Email == email);

            if (user == null)
                throw new NotFoundException("user with that guid doesnt exist");
            if (admin == null)
                throw new NotFoundException("user with that email doesnt exist");

            if (admin.UserRole == Role.Principal && (role == Role.Principal || role == Role.Admin))
                throw new BadRequestException("you cant change users role to that one");

            user.UserRole = role;
            await _context.SaveChangesAsync();

            var temp = await _context.Tokens.SingleOrDefaultAsync(h => h.UserId == user.Id);

            if (temp != null)
            {
                _context.Tokens.Remove(temp);
                await _context.SaveChangesAsync();
            }
            return new Response
            {
                Message = $"Role succesfully changed"
            };
        }
    }
}
