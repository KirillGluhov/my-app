using KeyTracingAPI.Database;
using KeyTracingAPI.Models.DTO.Key;
using KeyTracingAPI.Models.DTO.Request;
using KeyTracingAPI.Models.DTO.User;
using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.Models.Exceptions;
using KeyTracingAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeyTracingAPI.Services
{
    public class RequestService : IRequestService
    {
        private readonly AppDbContext _context;

        public RequestService(AppDbContext context)
        {
            _context = context;
        }
        private async Task<ActionResult<BookingKeyRequestDTOForUser>> _bkrMapperUser(BookingKeyRequest bkr)
        {
            /*            var key  = await _context.Key.FirstOrDefaultAsync(k => k.KeyId == bkr.KeyId);
                        await 
                        return new BookingKeyRequestDTOForUser
                        {
                            Key = new KeyDTO
                            {
                                Auditory = key.
                            },
                            BookingDate = bkr.DateToBeBooked,
                            TimeSlot = bkr.TimeSlot,
                            Description = bkr.Description,
                            RequestStatus = bkr.RequestStatus,
                            RequestId = bkr.Id,
                            IsKeyRecieved = bkr.IsKeyRecieved,
                            IsKeyReturned = bkr.IsKeyReturned,
                            IsRepetitive = bkr.IsRepetitive,
                        }*/
            return new BookingKeyRequestDTOForUser();
        }
        private async Task<ActionResult<List<BookingKeyRequestDTOForUser>>> _bkrListMapper(List<BookingKeyRequest> bkrList)
        {
            List<BookingKeyRequestDTOForUser> bkrDTOList = new List<BookingKeyRequestDTOForUser>();
            for (int i = 0; i < bkrList.Count; i++)
            {
                //bkrDTOList.Add(UserMapperForPrincipal(user[i]).Result);
            }
            return bkrDTOList;
        }

        public async Task<ActionResult<List<BookingKeyRequestDTOForUser>>> GetUserRequests(string email)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
                throw new InvalidLoginException();

            var userRequests = await _context.BookingKeyRequest
                .Include(bkr => bkr.BookedKeyInstance)
                .Where(bkr => bkr.UserId == user.Id)
                .ToListAsync();

            //var result = <List<BookingKeyRequestDTOForUser>>(userRequests);

            return new List<BookingKeyRequestDTOForUser>();
        }

        public async Task<ActionResult<Guid>> CreateRequest(BookingKeyRequestCreationForm requestDto)
        {
            return new Guid();
        }

        public async Task CancelRequest(Guid requestId)
        {

        }

        public async Task<ActionResult<List<BookingKeyRequestDTOForPrincipal>>> GetAllRequests(GetListOfRequestsQuery query)
        {
            return new List<BookingKeyRequestDTOForPrincipal>();
        }

        public async Task<ActionResult<BookingKeyRequestDTOForPrincipal>> GetRequest(Guid requestId)
        {
            return new BookingKeyRequestDTOForPrincipal();
        }

        public async Task ApproveRequest(Guid requestId)
        {
            
        }

        public async Task DeclineRequest(Guid requestId)
        {

        }
    }
}
