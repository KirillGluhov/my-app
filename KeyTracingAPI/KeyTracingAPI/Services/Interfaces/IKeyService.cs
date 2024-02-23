using KeyTracingAPI.Models.DTO.Key;
using KeyTracingAPI.Models.DTO.Request;
using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.WideUseModels;
using Microsoft.AspNetCore.Mvc;

namespace KeyTracingAPI.Services.Interfaces
{
    public interface IKeyService
    {
        Task<List<KeyDTO>> GetAllFreeKeys(GetListOfKeysQuery query);
        Task<List<KeyDTO>> GetAllKeys(KeySorting keySorting, bool? isInPrincipalOffice);
        Task<List<BookedKeyDTO>> GetConcreteKeyBookingInfo(GetConcreteKeyQuery query);
        Task<Response> ConfirmKey(Guid keyId);
        Task<Response> ChangeKeyStatus(Guid keyId);//объединить в одну(?)
        Task<Response> CreateKey(KeyCreateForm key);
        Task<Response> DeleteKey(Guid KeyId, bool forceDelete = false);
        Task<Response> ReturnKeyToPrincipal(Guid requestId);
    }
}
