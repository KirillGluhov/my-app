using KeyTracingAPI.Models.DTO.Request;
using KeyTracingAPI.WideUseModels;
using Microsoft.AspNetCore.Mvc;

namespace KeyTracingAPI.Services.Interfaces
{
    public interface IRequestService
    {
        Task<ActionResult<List<BookingKeyRequestDTOForUser>>> GetUserRequests(string email);
        Task<ActionResult<Guid>> CreateRequest(BookingKeyRequestCreationForm requestDto, string email);
        Task<ActionResult<Response>> CancelRequest(Guid requestId, string email);
        Task<ActionResult<List<BookingKeyRequestDTOForPrincipal>>> GetAllRequests(GetListOfRequestsQuery query);
        Task<ActionResult<BookingKeyRequestDTOForPrincipal>> GetRequest(Guid requestId);
        Task<ActionResult<Response>> ApproveRequest(Guid requestId);
        Task<ActionResult<Response>> DeclineRequest(Guid requestId);
    }
}
