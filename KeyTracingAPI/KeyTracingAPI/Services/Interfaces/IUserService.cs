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

        Task<ActionResult<Response>> Logout(string token);

        Task<UserDTO> GetProfile(string email);

        Task<ActionResult<Response>> EditProfile(UserEditModel user, string email);

        Task<ActionResult<List<UserDTOForPrincipal>>> GetUsers(GetListOfUsersQuery query);

        Task<ActionResult<Response>> ChangeRole(Guid userId, Role role, string email);
    }
}
