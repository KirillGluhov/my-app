using KeyTracingAPI.Models.DTO.Key;
using KeyTracingAPI.Models.DTO.Request;
using KeyTracingAPI.Services.Interfaces;
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

        [HttpGet("list")]
        public async Task<ActionResult<List<KeyDTO>>> GetAllKeys([FromQuery] GetListOfKeysQuery query)
        {
            var allRequests = await _keyService.GetAllRequests(query);

            return Ok(allRequests);
        }

        [HttpPost("/api/keys/{keyId}/release")]
        public async Task<ActionResult> ReleaseKey(Guid keyId)
        {
            await _keyService.ReleaseKey(keyId);

            return Ok("Key succesfully released");
        }

        [HttpPost("/api/keys/{keyId}/confirm")]
        public async Task<ActionResult> ConfirmKey(Guid keyId)
        {
            await _keyService.ConfirmKey(keyId);

            return Ok("Key taking succesfully confirmed");
        }
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] KeyCreateForm key)
        {
            await _keyService.CreateKey(key);

            return Ok("Key succesfully created");
        }
        [HttpDelete("/api/keys/delete/{keyId}")]
        public async Task<ActionResult> DeleteKey(Guid keyId)
        {
            await _keyService.DeleteKey(keyId);

            return Ok("Key succesfully deleted");
        }
    }
}
