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
        Task<ActionResult<TokenResponse>> Register(UserRegisterModel user);

        Task<ActionResult<TokenResponse>> Login(LoginCredentials login);

        Task Logout(string token);

        Task<UserDTO> GetProfile(string email);

        Task EditProfile(UserEditModel user, string email);

        Task<ActionResult<List<UserDTO>>> GetUsers(GetListOfUsersQuery query);

        Task ChangeRole(Guid userId, Role role);
    }
}
