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
        Task<List<object>> GetAllFreeKeys(GetListOfKeysQuery query);
        Task<List<object>> GetAllKeys(KeySorting keySorting, bool? isInPrincipalOffice);
        Task<object> GetConcreteKeyBookingInfo(GetConcreteKeyQuery query);
        Task<Response> ConfirmKey(Guid keyId);
        Task<Response> ChangeKeyStatus(Guid keyId, bool isInPrincipalOffice);//объединить в одну(?)
        Task<Response> CreateKey(KeyCreateForm key);
        Task<Response> DeleteKey(Guid KeyId, bool forceDelete = false);
        Task<Response> ReturnKeyToPrincipal(Guid requestId);
    }
}
