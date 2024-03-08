using KeyTracingAPI.Database;
using KeyTracingAPI.Models.DTO.Key;
using KeyTracingAPI.Models.DTO.Request;
using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.Models.Exceptions;
using KeyTracingAPI.Services.Interfaces;
using KeyTracingAPI.WideUseModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

//using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Text.RegularExpressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace KeyTracingAPI.Services
{
    public class KeyService(AppDbContext dbContext) : IKeyService
    {

        AppDbContext _dbContext = dbContext;

        public async Task<Response> ConfirmKey(Guid requestId)
        {
            var requestFromDB = await checkRequestExistance(requestId);

            if (requestFromDB!.UserId != UserChecker.UserId)
                throw new InvalidLoginException("You cant access this request");
            if (requestFromDB!.RequestStatus == RequestStatus.InProcess || requestFromDB.RequestStatus == RequestStatus.Declined)
                throw new BadRequestException("Your request is not approved yet, you cant confirm that you recieved key");
            if (requestFromDB!.DateToBeBooked > DateOnly.FromDateTime(DateTime.Today))
                throw new BadRequestException("You cant recieve key yet, ask principal when the booking day comes");

            var keyFromDB = await _dbContext.Key.FirstOrDefaultAsync(key => key.Id == requestFromDB.KeyId);
            if (keyFromDB!.IsInPrincipalOffice)
                throw new BadRequestException("Principal not confirmed yet that given key to you");

            if (requestFromDB.IsKeyRecieved == true)
                throw new BadRequestException($"You already recieved the key with id {requestFromDB.KeyId}, you cant decline it");

            var tryPreviousRequest = await _dbContext.BookingKeyRequest.Where(bookedKey => bookedKey.UserId != requestFromDB.UserId
            && bookedKey.DateToBeBooked == requestFromDB.DateToBeBooked && bookedKey.TimeSlot < requestFromDB.TimeSlot
            && bookedKey.RequestStatus == RequestStatus.Approved && bookedKey.IsKeyRecieved == false)
            .FirstOrDefaultAsync(bookedKey => bookedKey.KeyId == requestFromDB.KeyId);

            if (tryPreviousRequest != null)
                throw new BadRequestException("There are user before you with confirmed request, you cant recieve key yet");

            requestFromDB.IsKeyRecieved = true;
            await _dbContext.SaveChangesAsync();
            return new Response
            {
                Message = $"You confirmed that you are recieved key with id {requestFromDB.KeyId}"
            };
        }

        public async Task<Response> CreateKey(KeyCreateForm key)
        {
            var keyFromDB = await checkKeyExistance(key.Auditory, true);
            
            Key newKey = new Key
            {
                Id = Guid.NewGuid(),
                Auditory = key.Auditory
            };

            await _dbContext.Key.AddAsync(newKey);
            await _dbContext.SaveChangesAsync();
            return new Response
            {
                Message = "Key succesfully created"
            };
        }

        public async Task<Response> DeleteKey(Guid keyId, bool forceDelete = false)
        {
            var keyFromDB = await checkKeyExistance(keyId);

            /*var requestUser = await _dbContext.BookingKeyRequest
                .Where(request => request.IsKeyReturned == false && request.IsKeyRecieved == true)
                .OrderByDescending(request => request.DateToBeBooked)
                .FirstOrDefaultAsync(request => request.KeyId == keyId);
            if (requestUser != null && keyFromDB.IsInPrincipalOffice == false)
                throw new BadRequestException($"Key with id {keyId} can't be deleted, the key is in use of user with id {requestUser!.UserId}");*/

            if (!keyFromDB.IsInPrincipalOffice)
                throw new BadRequestException($"Key with id {keyId} is not in principal's office, it cant be deleted");

            var bookingOfKey = await _dbContext.BookedKeys
                .Where(bookedKey => bookedKey.DateToBeBooked >= DateOnly.FromDateTime(DateTime.Today))
                .FirstOrDefaultAsync(bookedKey => bookedKey.KeyId == keyId);

            if (bookingOfKey != null && !forceDelete)
                throw new BadRequestException($"Key with id {keyId} is already booked");

            _dbContext.Key.Remove(keyFromDB);
            await _dbContext.SaveChangesAsync();
            return new Response
            {
                Message = $"Key with id {keyId} removed from database"
            };
        }

        public async Task<List<object>> GetAllFreeKeys(GetListOfKeysQuery query)
        {
            var filteredKeys = await returnFilteredKeys(query.Sorting);

            List<object> validKeys = new List<object>();

            foreach(var key in filteredKeys)
            {
                if (query.IsInPrincipal != null && (key.IsInPrincipalOffice != query.IsInPrincipal))
                    continue;

                var keyBookings = await _dbContext.BookedKeys
                .Where(bk => bk.KeyId == key.Id && query.TimeSlots.Contains(bk.TimeSlot) &&
                             bk.DateToBeBooked >= query.Period.Key &&
                             bk.DateToBeBooked <= query.Period.Value)
                .Select(bk => bk.KeyId).ToListAsync();

                //Console.WriteLine($"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA --- {keyBookings.Count}");

                //Console.WriteLine($"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB --- {keyBookings.Count - (query.TimeSlots.Count * ((query.Period.Value.DayNumber - query.Period.Key.DayNumber) + 1))}");

                if (keyBookings.Count < (query.TimeSlots.Count * ((query.Period.Value.DayNumber - query.Period.Key.DayNumber) + 1)))
                    validKeys.Add(new 
                    {
                        key.Id,
                        key.Auditory,
                        key.IsInPrincipalOffice
                    });
            }

            return validKeys;
        }

        public async Task<List<object>> GetAllKeys(KeySorting sorting, bool? isInPrincipalOffice)
        {
            var filteredKeys = await returnFilteredKeys(sorting);
            var a = DateTime.Now;

            List<object> allKeys = new List<object>();

            foreach(var filteredKey in filteredKeys)
            {
                if (isInPrincipalOffice != null && (filteredKey.IsInPrincipalOffice != isInPrincipalOffice))
                    continue;

                allKeys.Add(new
                {
                    filteredKey.Id,
                    filteredKey.Auditory,
                    filteredKey.IsInPrincipalOffice
                });
            }

            return allKeys;
        }

        public async Task<object> GetConcreteKeyBookingInfo(GetConcreteKeyQuery query)
        {
            var keyFromDB = await checkKeyExistance(query.Auditory, false);

            var bookingInfoFromDB = await _dbContext.BookedKeys.Where(key => key.KeyId == keyFromDB.Id && (key.DateToBeBooked >= query.Period.Key && key.DateToBeBooked <= query.Period.Value))
                .OrderBy(key => key.DateToBeBooked)
                .ThenBy(key => key.TimeSlot)
                .Select(bookedKey => new {bookedKey.UserId,
                    bookedKey.DateToBeBooked,
                    bookedKey.TimeSlot})
                .ToListAsync();

            List<object> bookedKeyDTOs = new List<object>();

            foreach(var bookingInfo in bookingInfoFromDB)
            {
                bookedKeyDTOs.Add(new
                {
                    bookingInfo.UserId,
                    bookingInfo.DateToBeBooked,
                    bookingInfo.TimeSlot
                });
            }

            return new { 
                keyId = keyFromDB.Id,
                DatesWhenKeyBooked = bookedKeyDTOs
            };
        }

        public async Task<Response> ChangeKeyStatus(Guid keyId, bool isInPrincipalOffice)
        {
            var keyFromDB = await checkKeyExistance(keyId);

            var requestUser = await _dbContext.BookingKeyRequest
               .Where(request => request.IsKeyRecieved == true)
               .OrderByDescending(request => request.DateToBeBooked)
               .ThenByDescending(request => request.TimeSlot)
               .FirstOrDefaultAsync(request => request.KeyId == keyId);

            if (requestUser != null && requestUser.IsKeyReturned == false && isInPrincipalOffice)
                throw new BadRequestException($"Key with id {keyId} can't be returned to principal, the key is in use of user with id {requestUser!.UserId}");

            keyFromDB.IsInPrincipalOffice = isInPrincipalOffice;

            _dbContext.Key.Update(keyFromDB);
            await _dbContext.SaveChangesAsync();
            return new Response
            {
                Message = $"Key with id {keyId} succesfully " + $"{(isInPrincipalOffice ? "returned" : "issued")}"
            };
        }

        public async Task<Response> ReturnKeyToPrincipal(Guid requestId)
        {
            var requestFromDB = await checkRequestExistance(requestId);

            if (requestFromDB!.RequestStatus == RequestStatus.InProcess || requestFromDB.RequestStatus == RequestStatus.Declined)
                throw new BadRequestException("Your request is not approved yet, you cant confirm that you returned key");

            var nextRequestForKey = await _dbContext.BookedKeys
                .Where(bookedKey => bookedKey.DateToBeBooked == requestFromDB!.DateToBeBooked)
                .OrderByDescending(bookedKey => bookedKey.TimeSlot)
                .FirstOrDefaultAsync(key => key.KeyId == requestFromDB!.KeyId);

            if (nextRequestForKey != null && nextRequestForKey.UserId != requestFromDB!.UserId)
                throw new BadRequestException("There are already a user who booked the same key as in your request for a later timeslot");

            if (!requestFromDB.IsKeyRecieved)
                throw new BadRequestException("You didnt confirm that you recieved key yet");

            requestFromDB!.IsKeyReturned = true;
            _dbContext.BookingKeyRequest.Update(requestFromDB);
            await _dbContext.SaveChangesAsync();

            return new Response
            {
                Message = "You returned key succesfully"
            };
        }





        public async Task<BookingKeyRequest?> checkRequestExistance(Guid requestId)
        {
            var requestFromDB = await _dbContext.BookingKeyRequest.FirstOrDefaultAsync(request => request.Id == requestId);

            if (requestFromDB == null)
                throw new NotFoundException($"Request with id {requestId} does not exists");

            return requestFromDB;
        }
        public async Task<Key> checkKeyExistance(Guid keyId)
        {
            var keyFromDB = await _dbContext.Key.FirstOrDefaultAsync(key => key.Id == keyId);

            if (keyFromDB == null)
                throw new NotFoundException($"key with id {keyId} does not exist");

            return keyFromDB;
        }
        public async Task<Key> checkKeyExistance(string auditory, bool forCreation)
        {
            var keyFromDB = await _dbContext.Key.FirstOrDefaultAsync(key => key.Auditory == auditory);

            if (forCreation && keyFromDB != null)
                throw new BadRequestException($"key for auditory {auditory} already exists");
            else if (forCreation && keyFromDB == null)
                return null;

            if (keyFromDB == null)
                throw new NotFoundException($"key for auditory {auditory} does not exist");

            return keyFromDB;
        }
        public async Task<List<Key>> returnFilteredKeys(KeySorting keySorting)
        {
            if (keySorting == KeySorting.AuditoryAsc)
                return await Task.FromResult(_dbContext.Key.AsEnumerable().OrderBy(key => key, new KeyComparer()).ToList());

            return await Task.FromResult(_dbContext.Key.AsEnumerable().OrderByDescending(key => key, new KeyComparer()).ToList()); ;
        }
        class KeyComparer : IComparer<Key>
        {
            public int Compare(Key x, Key y)
            {
                string xNumericPart = new string(x.Auditory.Where(char.IsDigit).ToArray());
                string yNumericPart = new string(y.Auditory.Where(char.IsDigit).ToArray());

                int xNumeric = int.Parse(xNumericPart);
                int yNumeric = int.Parse(yNumericPart);

                if (xNumeric == yNumeric)
                    return string.Compare(x.Auditory, y.Auditory);
                else
                    return xNumeric.CompareTo(yNumeric);
            }
        }
    }
}
