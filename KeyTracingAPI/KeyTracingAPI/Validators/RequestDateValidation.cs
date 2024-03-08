using System.ComponentModel.DataAnnotations;

namespace KeyTracingAPI.Validators
{
    public class RequestDateValidation: ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var currentValue = (DateOnly)value;

            if (currentValue < DateOnly.FromDateTime(DateTime.Now))
            {
                return new ValidationResult(ErrorMessage = "Date must be later than yesterday date");
            }

            return ValidationResult.Success;
        }
    }
}
