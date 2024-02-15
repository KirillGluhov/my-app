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

namespace KeyTracingAPI.Controllers
{
    [ApiController]
    [Route("apishka")]
    public class UsersController() : ControllerBase
    {

        [HttpPost]
        [Route("super")]
        public string getString(string email)
        {
            var token = JwtHelper.GetNewToken(email, JwtConfigurations.AccessLifeTime);
            return token;
        }

        [HttpPost]
        [Route("loh")]
        [Authorize(Policy = "Teacher")]
        public string login()
        {
            return HttpContext.Request.Headers["Authorization"];
        }
    }
    /*[Route("api/account/[action]")]
    [ApiController]
    [SwaggerResponse((int)HttpStatusCode.InternalServerError, Type = typeof(Response), Description = "InternalServerError")]
    [SwaggerResponse((int)HttpStatusCode.OK)]
    [SwaggerResponse((int)HttpStatusCode.BadRequest)]

    public class UsersController : ControllerBase
    {
        private readonly IUsersService _userService;

        public UsersController(IUsersService userService)
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
                NameId = new Guid(),
                dbName = user.email,
                FullName = user.FullName,
                email = user.email,
                password = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(user.password))),
                Gender = Gender.Male,
                BirthDate = user.BirthDate,
                AddressId = user.AddressId,
                phoneNumber = user.phoneNumber,
            });
            return response;
        }

        [HttpPost]
        public async Task<ActionResult<TokenResponse>> login([FromBody] LoginCredentials login)
        {
            login.password = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(login.password)));

            return await _userService.Login(login);
        }
            
        [Authorize]
        [HttpPost]
        [SwaggerResponse((int)HttpStatusCode.Unauthorized)]
        [SwaggerResponse((int)HttpStatusCode.Forbidden)]
        public async Task<ActionResult> logout()
        {
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
        [SwaggerResponse((int)HttpStatusCode.Unauthorized)]
        [SwaggerResponse((int)HttpStatusCode.Forbidden)]
        [Route("/api/account/profile")]
        public async Task<UserDTO> GetProfile()
        {
            //for some reason claim name changes to this
            var dbName = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
            if (dbName == null)
            {
                throw new InvalidTokenException("Token not found");
            }

            var token = await HttpContext.GetTokenAsync("access_token");
            if (token == null)
            {
                throw new InvalidTokenException("Token not found");
            }

            var response = await _userService.GetProfile(dbName, token);

            return response;
        }

        [Authorize]
        [HttpPut]
        [SwaggerResponse((int)HttpStatusCode.Unauthorized)]
        [SwaggerResponse((int)HttpStatusCode.Forbidden)]
        [Route("/api/account/profile")]
        public async Task<ActionResult> PutProfile([FromBody] UserEditModel user)
        {
            var dbName = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;

            var token = await HttpContext.GetTokenAsync("access_token");
            if (token == null)
            {
                throw new InvalidTokenException("Token not found");
            }


            await _userService.EditProfile(user, dbName, token);

            return Ok("Profile successfully changed");
        }

    }*/
}
