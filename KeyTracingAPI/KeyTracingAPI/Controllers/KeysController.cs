using KeyTracingAPI.Models.DTO.Key;
using KeyTracingAPI.Models.DTO.Request;
using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.Services.Interfaces;
using KeyTracingAPI.WideUseModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KeyTracingAPI.Controllers
{
    [ApiController]
    [Route("api/keys/[action]")]
    [Authorize]
    public class KeysController : ControllerBase
    {
        private readonly IKeyService _keyService;

        public KeysController(IKeyService keyService)
        {
            _keyService = keyService;
        }

        [HttpGet]
        public async Task<List<KeyDTO2>> GetAllFreeKeys([FromQuery] GetListOfKeysQuery query)
        {
            var allFreeKeys = await _keyService.GetAllFreeKeys(query);

            return allFreeKeys;
        }

        [HttpGet]
        public async Task<List<KeyDTO2>> GetAllKeys(KeySorting keySorting, bool? isInPrincipalOffice)
        {
            var allKeys = await _keyService.GetAllKeys(keySorting, isInPrincipalOffice);

            return allKeys;
        } 

        [HttpGet]
        public async Task<BookedKeyInfoDTO> GetConcreteKeyBookingInfo([FromQuery] GetConcreteKeyQuery query)
        {
            var result = await _keyService.GetConcreteKeyBookingInfo(query);

            return result;
        }
 
        [HttpPost("/api/keys/{keyId}/ChangeKeyStatus")]
        [Authorize(Policy = "Principal")]
        public async Task<Response> ChangeKeyStatus(Guid keyId, bool isInPrincipalOffice)
        {
            var result =  await _keyService.ChangeKeyStatus(keyId, isInPrincipalOffice);

            return result;
        }

        [HttpPost("/api/keys/{requestId}/confirm")]
        [Authorize(Policy = "TeacherOrStudent")]
        public async Task<Response> ConfirmKey(Guid requestId)
        {
            var result = await _keyService.ConfirmKey(requestId);

            return result;
        }

        [HttpPost]
        [Authorize(Policy = "Principal")]
        public async Task<Response> Create([FromBody] KeyCreateForm key)
        {
            var result = await _keyService.CreateKey(key);

            return result;
        }

        [HttpDelete("/api/keys/delete/{keyId}")]
        [Authorize(Policy = "Principal")]
        public async Task<Response> DeleteKey(Guid keyId, bool forceDelete = false)
        {
            var result = await _keyService.DeleteKey(keyId, forceDelete);

            return result;
        }

        [HttpPost]
        [Authorize(Policy = "TeacherOrStudent")]
        public async Task<Response> ReturnKeyToPrincipal(Guid requestId)
        {
            var result = await _keyService.ReturnKeyToPrincipal(requestId);

            return result;
        }
    }
}
