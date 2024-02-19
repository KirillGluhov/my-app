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
using static System.Net.WebRequestMethods;

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
            var response = await _userService.Register(user);

            //в response на регистрацию необходим только токен, свои данные юзер может и так посмотреть, из профиля
            return response;
        }

        [HttpPost]
        public async Task<ActionResult<TokenResponse>> login([FromBody] LoginCredentials login)
        {
            login.Password = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(login.Password)));

            return await _userService.Login(login);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> logout()
        {
            var token = HttpContext.Request.Headers["Authorization"];
            Console.WriteLine(HttpContext.Request.Headers);

            await _userService.Logout(token.ToString().Substring(7));

            return Ok("succesfully log out");
        }

        [Authorize]
        [HttpGet]
        [Route("/api/account/profile")]
        public async Task<UserDTO> GetProfile()
        {
            var userEmailClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress" )?.Value;

            if (userEmailClaim == null)
            {
                throw new InvalidTokenException("Token not found");
            }

            var response = await _userService.GetProfile(userEmailClaim);

            return response;
        }

        [Authorize]
        [HttpPut]
        [Route("/api/account/profile")]
        public async Task<ActionResult> PutProfile([FromBody] UserEditModel user)
        {
            var userEmailClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

            if (userEmailClaim == null)
            {
                throw new InvalidTokenException("Token not found");
            }

            await _userService.EditProfile(user, userEmailClaim);

            return Ok("Profile successfully changed");
        }

        [HttpGet("/api/users/")]
        [Authorize(Policy = "Principal")]
        public async Task<ActionResult<List<UserDTOForPrincipal>>> GetListOfUsers([FromQuery] GetListOfUsersQuery query)
        {
            var allUsers = await _userService.GetUsers(query);

            return Ok(allUsers);
        }

        [HttpPost("/api/users/{userId}/assign-role/{role}")]
        [Authorize(Policy = "Admin")]
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
