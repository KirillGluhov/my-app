using KeyTracingAPI.Models.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using System.Diagnostics;

namespace KeyTracingAPI.Exceptions
{
    public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
    {
        ILogger<GlobalExceptionHandler> _logger = logger;
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var traceId = Activity.Current?.Id ?? httpContext.TraceIdentifier;

            _logger.LogError(
                exception,
                $"Error occured. TraceId : {traceId}",
                Environment.MachineName,
                traceId
                ); // optional

            var (statusCode, title) = MapException(exception);

            await Results.Problem(
                title: title,
                statusCode: statusCode,
                extensions: new Dictionary<string, object?>
                {
                    ["traceId"] = traceId,
                    ["machine"] = Environment.MachineName,
                    ["data"] = exception.Data
                }
            ).ExecuteAsync(httpContext);

            return true;
        }


        private static (int StatusCode, string Title) MapException(Exception exception)
        {
            return exception switch
            {
                InvalidOperationException => (StatusCodes.Status400BadRequest, exception.Message ),
                InvalidLoginException invalidLoginException => (StatusCodes.Status403Forbidden, invalidLoginException.Message),
                InvalidTokenException invalidTokenException => (StatusCodes.Status401Unauthorized, invalidTokenException.Message),
                BadRequestException badRequestException => (StatusCodes.Status400BadRequest, badRequestException.Message),
                NotFoundException notFoundException => (StatusCodes.Status404NotFound, notFoundException.Message),
                _ => (StatusCodes.Status500InternalServerError, "Some stupid error occured")
            }; 
        } 
    }
}



/*private ProblemDetails CreateProblemDetails(in HttpContext httpContext, in Exception exception)
{
    var statusCode = httpContext.Response.StatusCode;
    var title = ReasonPhrases.GetReasonPhrase(statusCode);

    var problemDetails = new ProblemDetails
    {
        Status = statusCode,
        Title = title,
        Detail = exception.Message,
        Extensions =
                {
                    ["traceId"] = httpContext.TraceIdentifier,
                    ["data"] = exception.Data
                }
    };

    return problemDetails;
}*/