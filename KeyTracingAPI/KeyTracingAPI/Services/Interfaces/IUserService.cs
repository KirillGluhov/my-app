using KeyTracingAPI.Models.DTO.Key;
using KeyTracingAPI.Models.DTO.User;
using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.WideUseModels;
using Microsoft.AspNetCore.Mvc;

namespace KeyTracingAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<ActionResult<TokenResponse>> Register(User user);

        Task<ActionResult<TokenResponse>> Login(LoginCredentials login);

        Task Logout(string token);

        Task<UserDTO> GetProfile();//token, login (if needed)

        Task EditProfile(UserEditModel user);//token, login (if needed)

        Task<ActionResult<List<UserDTO>>> GetUsers(GetListOfUsersQuery query);

        Task ChangeRole(Guid userId, Role role);
    }
}
