using KeyTracingAPI.Models.DTO.Request;
using KeyTracingAPI.Models.Exceptions;
using KeyTracingAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace KeyTracingAPI.Controllers
{
    [ApiController]
    [Route("api/requests/[action]")]
    [Authorize]
    public class RequestsController : ControllerBase
    {
        private readonly IRequestService _requestService;

        public RequestsController(IRequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<BookingKeyRequestDTOForUser>>> GetUserRequests()
        {
            var userEmailClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

            if (userEmailClaim == null)
                throw new InvalidTokenException("Token not found");

            var response = await _requestService.GetUserRequests(userEmailClaim);

            return response;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Guid>> CreateRequest([FromBody] BookingKeyRequestCreationForm requestDto)
        {
            var userEmailClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

            if (userEmailClaim == null)
                throw new InvalidTokenException("Token not found");

            var requestId = await _requestService.CreateRequest(requestDto, userEmailClaim);

            return requestId;
        }

        [HttpDelete("api/requests/cancel/{requestId}")]
        [Authorize]
        public async Task<ActionResult> CancelRequest(Guid requestId)
        {
            await _requestService.CancelRequest(requestId);

            return Ok("Request succesfully returned");
        }

        [HttpGet("list")]
        [Authorize(Policy = "Principal")]
        public async Task<ActionResult<List<BookingKeyRequestDTOForPrincipal>>> GetAllRequests([FromQuery] GetListOfRequestsQuery query)
        {
            var allRequests = await _requestService.GetAllRequests(query);

            return Ok(allRequests);
        }
        [HttpGet("api/requests/{requestId}")]
        [Authorize(Policy = "Principal")]
        public async Task<ActionResult<BookingKeyRequestDTOForPrincipal>> GetRequest(Guid requestId)
        {
            var request = await _requestService.GetRequest(requestId);

            return Ok(request);
        }

        [HttpPost("api/requests/approve/{requestId}")]
        [Authorize(Policy = "Principal")]
        public async Task<ActionResult> ApproveRequest(Guid requestId)
        {
            await _requestService.ApproveRequest(requestId);

            return Ok("Request succesfully approved");
        }

        [HttpPost("api/requests/decline/{requestId}")]
        [Authorize(Policy = "Principal")]
        public async Task<ActionResult> DeclineRequest(Guid requestId)
        {
            await _requestService.DeclineRequest(requestId);

            return Ok("Request succesfully declined");
        }
    }
}
