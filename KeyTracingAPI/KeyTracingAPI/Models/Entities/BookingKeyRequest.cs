using KeyTracingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.Entities
{
    public class BookingKeyRequest
    {
        //нужно ли делать дату заявки? +надо делать проверку на невозможность сделать заявку в прошлое + добавить автоматическое удаление старых не рассмотренных
        [Key]
        public Guid Id { get; set; } //id vmesto sostavnogo klycha iz 5 polei budet, tak proshe
        public Guid UserId { get; set; }
        public Guid KeyId { get; set; }
        public DateOnly DateToBeBooked { get; set; }
        public DateTime BookingDateTime { get; set; }
        public TimeSlot TimeSlot { get; set; }
        [Required]
        public string? Description { get; set; }
        public RequestStatus RequestStatus { get; set; } = RequestStatus.InProcess;
        public bool IsKeyRecieved { get; set; } = false;
        public bool IsKeyReturned { get; set; } = false;
        public bool IsRepetitive { get; set; } = false; // относится только к учителю, говорится конкретно о ключе(аудитории) и тайм-слоту (хотите ли вы сделать заявку для аудитории и этого таймслота постоянной, что то такое)
                                                        // . Если преподаватель обновляет заявку из списка своих заявок, делая её постоянной (триггерит кнопку),
        //то отправляется запрос на изменение этого поля на противоположное значение (то есть как сделать постоянной так и убрать постояноство). После триггера кнопки и отправки запроса в таблице KeySlotsRepetitiveRequest 
        //появляется или удаляется запись для конкретного юзера, ключа и тайм слота, и если в этой таблице есть заявка на такую аудиторию на такое время, то никто больше не может отправлять заявки на эту аудиторию на такое время

        public BookedKey? BookedKeyInstance { get; set; }
    }
}
