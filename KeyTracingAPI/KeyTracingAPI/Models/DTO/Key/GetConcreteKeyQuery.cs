using KeyTracingAPI.Validators;
using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Models.DTO.Key
{
    public class GetConcreteKeyQuery
    {
        [Required]
        [PeriodValidation]
        public KeyValuePair<DateOnly, DateOnly> Period { get; set; }
        [Required]
        public string Auditory { get; set; }
    }
}
