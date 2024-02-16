using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.ManyToMany
{
    public class BookingKeyRequest
    {
        //нужно ли делать дату заявки? +надо делать проверку на невозможность сделать заявку в прошлое + добавить автоматическое удаление старых не рассмотренных
        public Guid UserId { get; set; }
        public Guid KeyId { get; set; }
        public DateOnly BookingDate { get; set; }
        public TimeSlot TimeSlot { get; set; }
        [Required]
        public string? Description { get; set; }
        public RequestStatus RequestStatus { get; set; } = RequestStatus.InProcess;
        public bool IsKeyRecieved { get; set; } = false;
        public bool IsKeyReturned { get; set; } = false;
    }
}
