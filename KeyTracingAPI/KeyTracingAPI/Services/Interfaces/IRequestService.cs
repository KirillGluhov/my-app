using KeyTracingAPI.Models.DTO.Request;
using Microsoft.AspNetCore.Mvc;

namespace KeyTracingAPI.Services.Interfaces
{
    public interface IRequestService
    {
        //token, login (if needed)
        Task<ActionResult<List<BookingKeyRequestDTO>>> GetUserRequests();
        Task<ActionResult<Guid>> CreateRequest(BookingKeyRequestDTO requestDto);
        Task CancelRequest(Guid requestId);
        Task<ActionResult<List<BookingKeyRequestDTO>>> GetAllRequests(GetListOfRequestsQuery query);
        Task ApproveRequest(Guid requestId);
        Task DeclineRequest(Guid requestId);
    }
}
