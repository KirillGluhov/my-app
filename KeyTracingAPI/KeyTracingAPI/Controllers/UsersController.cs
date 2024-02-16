using KeyTracingAPI.Models;
//using KeyTracingAPI.Models.UserModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using System.Net;
using Swashbuckle.AspNetCore.Annotations;
using System.Security.Cryptography;
//using KeyTracingAPI.Services.Interfaces;
using KeyTracingAPI.Models.Exceptions;
//using FoodDelivery2.API.USERS.Models;
using KeyTracingAPI.JWT;
using KeyTracingAPI.Database;
using KeyTracingAPI.Services.Interfaces;
using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.WideUseModels;
using System.Reflection;
using KeyTracingAPI.Models.DTO.User;
using KeyTracingAPI.Models.Enums;

namespace KeyTracingAPI.Controllers
{
    [ApiController]
    [Route("api/auth/[action]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<TokenResponse>> register([FromBody] UserRegisterModel user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            var response = await _userService.Register(new User
            {
                Id = new Guid(),
                NormalizedName = user.FullName,
                FullName = user.FullName.Normalize(),
                Email = user.Email,
                Password = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(user.password)))
                //token?
            });//надо перенести эту логику в сервис
            return response;
        }

        [HttpPost]
        public async Task<ActionResult<TokenResponse>> login([FromBody] LoginCredentials login)
        {
            login.password = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(login.password)));

            return await _userService.Login(login);
        }

        [HttpPost]
        public async Task<ActionResult> logout()
        {
            //token?
            var token = await HttpContext.GetTokenAsync("access_token");
            if (token == null)
            {
                throw new InvalidTokenException("Token not found");
            }

            await _userService.Logout(token);

            return Ok("succesfully log out");
        }

        [Authorize]
        [HttpGet]
        [Route("/api/account/profile")]
        public async Task<UserDTO> GetProfile()
        {
            var response = await _userService.GetProfile();//token, login (if needed)

            return response;
        }

        [Authorize]
        [HttpPut]
        [Route("/api/account/profile")]
        public async Task<ActionResult> PutProfile([FromBody] UserEditModel user)
        {
            await _userService.EditProfile(user);//token, login (if needed)

            return Ok("Profile successfully changed");
        }

        [HttpGet("/api/users/")]
        [Authorize(Policy = "Principal")]
        public async Task<ActionResult<List<UserDTO>>> GetUsers(GetListOfUsersQuery query)
        {
            var allUsers = await _userService.GetUsers(query);

            return Ok(allUsers);
        }

        [HttpPost("/api/users/{userId}/assign-role/{role}")]
        [Authorize(Policy = "Principal")]
        public async Task<ActionResult> GetUsers(Guid userId, Role role)
        {
            await _userService.ChangeRole(userId, role);

            return Ok("role succesfully changed");
        }

        /*[HttpPost]
        public string login(string email)
        {
            var token = JwtHelper.GetNewToken(email, JwtConfigurations.AccessLifeTime);
            return token;
        }

        [HttpPost]
        [Route("loh")]
        [Authorize(Policy = "Teacher")]
        public string authorize()
        {
            return HttpContext.Request.Headers["Authorization"];
        }*/
    }

}
