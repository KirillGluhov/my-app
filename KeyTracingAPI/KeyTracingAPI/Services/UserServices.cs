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
using Microsoft.IdentityModel.Tokens;
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

            Console.WriteLine(alreadyExistsToken.AccessToken);

            if (alreadyExistsToken == null)
            {
                throw new InvalidTokenException();
            }
        }
        private async Task<UserDTO> UserMapper(User user)
        {
            return new UserDTO
            {
                FullName = user.FullName,
                Email = user.Email,
                Password = user.Password,
                UserRole = user.UserRole
            };
        }
        private async Task<List<UserDTO>> UserListMapper(List<User> user)
        {
            List<UserDTO> usersDTO = new List<UserDTO>();
            for (int i = 0; i < user.Count; i++)
            {
                usersDTO.Add(UserMapper(user[i]).Result);
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
                //token(почему у них друг на друга(юзер-токен) взаимная ассосиация?)
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
                return new TokenResponse { AccessToken = temp.AccessToken };

            var token1 = JwtHelper.GetNewToken(login.Email, JwtConfigurations.AccessLifeTime, user.UserRole);
            var token2 = JwtHelper.GetNewToken(login.Email, JwtConfigurations.RefreshLifeTime, user.UserRole);

            await _context.Tokens.AddAsync(new Token { AccessToken = token1, RefreshToken = token2, UserId = user.Id });
            await _context.SaveChangesAsync();

            TokenResponse result = new TokenResponse();
            result.AccessToken = token1;

            return result;
        }

        public async Task Logout(string token)
        {
            Console.WriteLine(token);

            await _IsTokenValid(token);
            Console.WriteLine("PLACE 1");

            var temp = await _context.Tokens.SingleOrDefaultAsync(h => h.AccessToken == token);

            if (temp == null)
                throw new InvalidLoginException();

            Console.WriteLine("PLACE 2");


            _context.Tokens.Remove(temp);
            await _context.SaveChangesAsync();
        }

        public async Task<UserDTO> GetProfile(string Email)
        {
            var temp = await _context.Users.SingleOrDefaultAsync(h => h.Email == Email);

            if (temp == null)
                throw new InvalidLoginException();

            return await UserMapper(temp);
        }

        public async Task EditProfile(UserEditModel user, string Email)
        {
            var temp = await _context.Users.SingleOrDefaultAsync(h => h.Email == Email);

            if (temp == null)
                throw new InvalidLoginException();

            temp.FullName = user.FullName;
            temp.Password = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(user.password)));

            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<List<UserDTO>>> GetUsers(GetListOfUsersQuery query)
        {
            var totalUsersCount = await _context.Users.CountAsync();

            if (totalUsersCount == 0)
                throw new Exception("totalUsersCount was 0");

            var userQuery = _context.Users.Where(d => query.Roles.Contains((Role)d.UserRole));

            if (query.hasRequests)
                userQuery = userQuery.Where(d => d.UserSlots != null);

            if (query.Name != null)
                userQuery = userQuery.Where(model => EF.Functions.ILike(model.FullName, "%" + query.Name + "%"));
            
            var usersList = await userQuery.ToListAsync();

            return await UserListMapper(usersList);
        }

        public async Task ChangeRole(Guid userId, Role role)
        {
            var user = await _context.Users.SingleOrDefaultAsync(h => h.Id == userId);

            if (user == null)
                throw new BadRequestException("user with that guid doesnt exist");

            user.UserRole = role;

            await _context.SaveChangesAsync();
        }
    }
}
