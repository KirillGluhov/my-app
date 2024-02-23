using KeyTracingAPI.Database;
using KeyTracingAPI.Models.DTO.Key;
using KeyTracingAPI.Models.DTO.Request;
using KeyTracingAPI.Models.DTO.User;
using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.Models.Exceptions;
using KeyTracingAPI.Models.ManyToMany;
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
            var key = await _context.Key.FirstOrDefaultAsync(k => k.Id == bkr.KeyId);
            return new BookingKeyRequestDTOForUser
            {
                Key = new KeyDTO
                {
                    Auditory = key.Auditory,
                    IsInPrincipalOffice = key.IsInPrincipalOffice
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
            var key = await _context.Key.FirstOrDefaultAsync(k => k.Id == bkr.KeyId);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == bkr.UserId);
            return new BookingKeyRequestDTOForPrincipal
            {
                Key = new KeyDTO
                {
                    Auditory = key.Auditory,
                    IsInPrincipalOffice = key.IsInPrincipalOffice
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

        public async Task<ActionResult<Guid>> CreateRequest(BookingKeyRequestCreationForm requestDto, string email)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
                throw new InvalidLoginException();

            var key = await _context.Key.SingleOrDefaultAsync(k => k.Id == requestDto.KeyId);
            if (key == null)
                throw new NotFoundException("key with that guid doesnt exist");

            var approved_request = await _context.BookingKeyRequest.FirstOrDefaultAsync(bkr => bkr.TimeSlot == requestDto.TimeSlot && bkr.DateToBeBooked == requestDto.DateToBeBooked && bkr.RequestStatus == RequestStatus.Approved && bkr.KeyId == requestDto.KeyId);
            if (approved_request != null)
                throw new BadRequestException("this key is occupied at this time");

            var user_request = await _context.BookingKeyRequest.FirstOrDefaultAsync(bkr => bkr.TimeSlot == requestDto.TimeSlot && bkr.DateToBeBooked == requestDto.DateToBeBooked && bkr.UserId == user.Id && bkr.KeyId == requestDto.KeyId);
            if (user_request != null)
                throw new BadRequestException("you actually have request at this time");

            var request = new BookingKeyRequest
            {
                Id = new Guid(),
                UserId = user.Id,
                KeyId = requestDto.KeyId,
                DateToBeBooked = requestDto.DateToBeBooked,
                BookingDateTime = requestDto.BookingDateTime,
                TimeSlot = requestDto.TimeSlot,
                Description = requestDto.Description,
                IsRepetitive = requestDto.IsRepetetive
            };
            if (requestDto.IsRepetetive)
            {
                var bkrRepetitive = await _context.keySlotsRepetitiveRequests.SingleOrDefaultAsync(req => req.TimeSlot == requestDto.TimeSlot && req.UserId == user.Id && req.KeyId == requestDto.KeyId);
                if (bkrRepetitive != null)
                {
                    request.RequestStatus = RequestStatus.Approved;//если при этом уже существует апрувнатая заявка, то до этой точки не дойдет и препод не сможет занять ауд
                }
            }

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
            if (request.RequestStatus == RequestStatus.Approved)
            {
                var bkrList = await _context.BookingKeyRequest.Where(b => b.TimeSlot == request.TimeSlot && b.DateToBeBooked == request.DateToBeBooked && b.KeyId == request.KeyId).ToListAsync();
                foreach (BookingKeyRequest declinedBkr in bkrList)
                {
                    declinedBkr.RequestStatus = RequestStatus.InProcess;
                }
            }
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

            if (query.IsRepetitive)
                bkrQuery = bkrQuery.Where(d => d.IsRepetitive);

            if (query.Roles != null)
                bkrQuery = bkrQuery.Where(d => query.Roles.Contains((Role)d.User.UserRole));

            if (query.TimeSlot != null)
                bkrQuery = bkrQuery.Where(d => query.TimeSlot.Contains((TimeSlot)d.TimeSlot));

            if (query.Status != null)
                bkrQuery = bkrQuery.Where(d => query.Status.Contains((RequestStatus)d.RequestStatus));

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

            var bkrList = await _context.BookingKeyRequest.Where(b => b.TimeSlot == bkr.TimeSlot && b.DateToBeBooked == bkr.DateToBeBooked && b.KeyId == bkr.KeyId).ToListAsync();
            foreach(BookingKeyRequest declinedBkr in bkrList)
            {
                declinedBkr.RequestStatus = RequestStatus.Declined;
            }
            bkr.RequestStatus = RequestStatus.Approved;
            if (bkr.IsRepetitive)
                await _context.keySlotsRepetitiveRequests.AddAsync(new KeySlotsRepetitiveRequest
                {
                    UserId = bkr.UserId,
                    KeyId = bkr.KeyId,
                    TimeSlot = bkr.TimeSlot
                });
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
