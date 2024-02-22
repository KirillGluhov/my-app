using KeyTracingAPI.Database;
using KeyTracingAPI.Models.DTO.Key;
using KeyTracingAPI.Models.DTO.Request;
using KeyTracingAPI.Models.DTO.User;
using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.Models.Enums;
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
        private async Task<BookingKeyRequestDTOForUser> _bkrMapperUser(BookingKeyRequest bkr)
        {
            var key = await _context.Keys.FirstOrDefaultAsync(k => k.Id == bkr.KeyId);
            return new BookingKeyRequestDTOForUser
            {
                Key = new KeyDTO
                {
                    Auditory = key.Auditory,
                    BookingDate = bkr.DateToBeBooked,
                    IsInPrincipalOffice = key.IsInPrincipalOffice,
                    TimeSlot = bkr.TimeSlot
                },
                BookingDate = bkr.DateToBeBooked,
                TimeSlot = bkr.TimeSlot,
                Description = bkr.Description,
                RequestStatus = bkr.RequestStatus,
                RequestId = bkr.Id,
                IsKeyRecieved = bkr.IsKeyRecieved,
                IsKeyReturned = bkr.IsKeyReturned,
                IsRepetitive = bkr.IsRepetitive
            };
        }
        private async Task<BookingKeyRequestDTOForPrincipal> _bkrMapperPrincipal (BookingKeyRequest bkr)
        {
            var key = await _context.Keys.FirstOrDefaultAsync(k => k.Id == bkr.KeyId);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == bkr.UserId);
            return new BookingKeyRequestDTOForPrincipal
            {
                Key = new KeyDTO
                {
                    Auditory = key.Auditory,
                    BookingDate = bkr.DateToBeBooked,
                    IsInPrincipalOffice = key.IsInPrincipalOffice,
                    TimeSlot = bkr.TimeSlot
                },
                User = new UserDTO
                {
                    FullName = user.FullName,
                    Email = user.Email,
                    UserRole = user.UserRole
                },
                BookingDate = bkr.DateToBeBooked,
                TimeSlot = bkr.TimeSlot,
                Description = bkr.Description,
                RequestStatus = bkr.RequestStatus,
                RequestId = bkr.Id,
            };
        }
        private async Task<ActionResult<List<BookingKeyRequestDTOForUser>>> _bkrUserListMapper(List<BookingKeyRequest> bkrList)
        {
            List<BookingKeyRequestDTOForUser> bkrDTOList = new List<BookingKeyRequestDTOForUser>();
            for (int i = 0; i < bkrList.Count; i++)
            {
                bkrDTOList.Add(_bkrMapperUser(bkrList[i]).Result);
            }
            return bkrDTOList;
        }
        private async Task<ActionResult<List<BookingKeyRequestDTOForPrincipal>>> _bkrPrincipalListMapper(List<BookingKeyRequest> bkrList)
        {
            List<BookingKeyRequestDTOForPrincipal> bkrDTOList = new List<BookingKeyRequestDTOForPrincipal>();
            for (int i = 0; i < bkrList.Count; i++)
            {
                bkrDTOList.Add(_bkrMapperPrincipal(bkrList[i]).Result);
            }
            return bkrDTOList;
        }

        public async Task<ActionResult<List<BookingKeyRequestDTOForUser>>> GetUserRequests(string email)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
                throw new InvalidLoginException();

            var userRequests = await _context.BookingKeyRequest
                .Where(bkr => bkr.UserId == user.Id)
                .ToListAsync();

            var result = await _bkrUserListMapper(userRequests);

            return result;
        }

        public async Task<ActionResult<Guid>> CreateRequest(BookingKeyRequestCreationForm requestDto)
        {
            var request = new BookingKeyRequest
            {
                Id = new Guid(),
                UserId = requestDto.UserId,
                KeyId = requestDto.KeyId,
                DateToBeBooked = requestDto.DateToBeBooked,
                BookingDateTime = requestDto.BookingDateTime,
                TimeSlot = requestDto.TimeSlot,
                Description = requestDto.Description
            };

            await _context.BookingKeyRequest.AddAsync(request);
            await _context.SaveChangesAsync();

            return request.Id;
        }

        public async Task CancelRequest(Guid requestId)
        {
            var request = await _context.BookingKeyRequest.SingleOrDefaultAsync(req => req.Id == requestId);
            if (request == null)
                throw new NotFoundException("cant find request with that id");

            _context.BookingKeyRequest.Remove(request);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<List<BookingKeyRequestDTOForPrincipal>>> GetAllRequests(GetListOfRequestsQuery query)
        {
            var totalRequestCount = await _context.BookingKeyRequest.CountAsync();

            if (totalRequestCount == 0)
                return new List<BookingKeyRequestDTOForPrincipal>();

            var bkrQuery = _context.BookingKeyRequest
                .Include(bkr => bkr.User)
                .Include(bkr => bkr.Key)
                .AsQueryable();
            if (query.IsKeyReturned)
                bkrQuery = bkrQuery.Where(d => d.IsKeyReturned);

            if (query.IsKeyRecieved)
                bkrQuery = bkrQuery.Where(d => d.IsKeyRecieved);

            if (query.Roles != null)
                bkrQuery = bkrQuery.Where(d => query.Roles.Contains((Role)d.User.UserRole));

            if (query.TimeSlot != null)
                bkrQuery = bkrQuery.Where(d => query.TimeSlot.Contains((TimeSlot)d.TimeSlot));

            if (query.Status != null)
                bkrQuery = bkrQuery.Where(d => query.Status == d.RequestStatus);

            bkrQuery = query.Sorting switch
            {
                RequestSorting.DateAsc => bkrQuery.OrderBy(d => d.DateToBeBooked), //.Skip((page - 1) * pageSize).Take(pageSize)
                RequestSorting.DateDesc => bkrQuery.OrderByDescending(d => d.DateToBeBooked),
                RequestSorting.AuditoryAsc => bkrQuery.OrderBy(d => d.Key.Auditory),
                RequestSorting.AuditoryDesc => bkrQuery.OrderByDescending(d => d.Key.Auditory),
                _ => bkrQuery.OrderBy(d => d.Id)//.Skip((page - 1) * pageSize).Take(pageSize)
            };

            var bkrList = await bkrQuery.ToListAsync();

            return await _bkrPrincipalListMapper(bkrList);
        }

        public async Task<ActionResult<BookingKeyRequestDTOForPrincipal>> GetRequest(Guid requestId)
        {
            var bkr = await _context.BookingKeyRequest.SingleOrDefaultAsync(h => h.Id == requestId);

            if (bkr == null)
                throw new NotFoundException("Cant find booking key request with that guid");

            return await _bkrMapperPrincipal(bkr);
        }

        public async Task ApproveRequest(Guid requestId)
        {
            var bkr = await _context.BookingKeyRequest.SingleOrDefaultAsync(h => h.Id == requestId);

            if (bkr == null)
                throw new NotFoundException("Cant find booking key request with that guid");
            bkr.RequestStatus = RequestStatus.Approved;
            await _context.SaveChangesAsync();
        }

        public async Task DeclineRequest(Guid requestId)
        {
            var bkr = await _context.BookingKeyRequest.SingleOrDefaultAsync(h => h.Id == requestId);

            if (bkr == null)
                throw new NotFoundException("Cant find booking key request with that guid");
            bkr.RequestStatus = RequestStatus.Declined;
            await _context.SaveChangesAsync();
        }
    }
}
