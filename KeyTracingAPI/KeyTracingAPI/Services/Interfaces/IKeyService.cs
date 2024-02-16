using KeyTracingAPI.Models.DTO.Key;
using KeyTracingAPI.Models.DTO.Request;
using Microsoft.AspNetCore.Mvc;

namespace KeyTracingAPI.Services.Interfaces
{
    public interface IKeyService
    {
        Task<ActionResult<List<KeyDTO>>> GetAllRequests(GetListOfKeysQuery query);
        Task ReleaseKey(Guid keyId);
        Task ConfirmKey(Guid keyId);//объединить в одну(?)
        Task CreateKey(KeyCreateForm key);
        Task DeleteKey(Guid KeyId);
    }
}
