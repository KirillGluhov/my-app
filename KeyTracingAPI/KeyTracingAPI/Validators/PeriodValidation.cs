using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Validators
{
    public class PeriodValidation : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return null;

            var Period = (KeyValuePair<DateOnly, DateOnly>)value;
            if ((Period.Key == null && Period.Value != null) || (Period.Value == null && Period.Key != null))
                return new ValidationResult("You cant just enter one field");

            if (Period.Key > Period.Value)
                return new ValidationResult("Start date cant be bigger than end date");

            if (Period.Key < DateOnly.FromDateTime(DateTime.Today) || Period.Value < DateOnly.FromDateTime(DateTime.Today))
                return new ValidationResult("Period date cant be less than todays date");

            return ValidationResult.Success;
        }
    }
}
