using KeyTracingAPI.Models;
using KeyTracingAPI.Models.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace KeyTracingAPI.Services.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                context.Response.ContentType = "application/json";

                if (ex is BadRequestException)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                    await context.Response.WriteAsync(addProblemDetails(ex, HttpStatusCode.BadRequest).Result);
                }
                else if (ex is InvalidLoginException)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;

                    await context.Response.WriteAsync(addProblemDetails(ex, HttpStatusCode.NotFound).Result);
                }
                else if (ex is InvalidTokenException)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.Forbidden;

                    await context.Response.WriteAsync(addProblemDetails(ex, HttpStatusCode.Forbidden).Result);
                }
                else
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                    await context.Response.WriteAsync(addProblemDetails(ex, HttpStatusCode.InternalServerError).Result);
                }
            }
        }

        private async Task<string> addProblemDetails(Exception ex, HttpStatusCode status)
        {
            Response problemDetails = new Response
            {
                status = status.ToString(),
                message = ex.Message,
            };

            var result = JsonSerializer.Serialize(problemDetails);

            return result;
        }
    }
}
