using KeyTracingAPI.Models;
using KeyTracingAPI.Models.UserModels;
using Microsoft.AspNetCore.Mvc;

namespace KeyTracingAPI.Services.Interfaces
{
    public interface IUsersService
    {
        Task<ActionResult<TokenResponse>> Register(User user);

        Task<ActionResult<TokenResponse>> Login(LoginCredentials login);

        Task Logout(string token);

        Task<UserDTO> GetProfile(string dbName, string token);

        Task EditProfile(UserEditModel user, string dbName, string token);
    }
}
