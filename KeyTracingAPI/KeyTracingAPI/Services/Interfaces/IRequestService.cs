using KeyTracingAPI.Models.DTO.Request;
using Microsoft.AspNetCore.Mvc;

namespace KeyTracingAPI.Services.Interfaces
{
    public interface IRequestService
    {
        Task<ActionResult<List<BookingKeyRequestDTOForUser>>> GetUserRequests(string email);
        Task<ActionResult<Guid>> CreateRequest(BookingKeyRequestCreationForm requestDto, string email);
        Task CancelRequest(Guid requestId);
        Task<ActionResult<List<BookingKeyRequestDTOForPrincipal>>> GetAllRequests(GetListOfRequestsQuery query);
        Task<ActionResult<BookingKeyRequestDTOForPrincipal>> GetRequest(Guid requestId);
        Task ApproveRequest(Guid requestId);
        Task DeclineRequest(Guid requestId);
    }
}
