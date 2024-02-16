﻿using KeyTracingAPI.Models.DTO.Request;
using KeyTracingAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KeyTracingAPI.Controllers
{
    [ApiController]
    [Route("api/requests/[action]")]
    public class RequestsController : ControllerBase
    {
        private readonly IRequestService _requestService;

        public RequestsController(IRequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<BookingKeyRequestDTO>>> GetUserRequests()
        {
            var response = await _requestService.GetUserRequests();//token, login (if needed)

            return response;
        }

        [Authorize]
        public async Task<ActionResult<Guid>> CreateRequest([FromBody] BookingKeyRequestDTO requestDto)
        {
            //token, login, userid (if needed)
            var requestId = await _requestService.CreateRequest(requestDto);

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
        public async Task<ActionResult> GetAllRequests([FromQuery] GetListOfRequestsQuery query)
        {
            var allRequests = await _requestService.GetAllRequests(query);

            return Ok(allRequests);
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
