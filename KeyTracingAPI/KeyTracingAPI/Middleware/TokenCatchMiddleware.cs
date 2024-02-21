using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using System;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using KeyTracingAPI.Database;
using Microsoft.EntityFrameworkCore;
using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.Models.Exceptions;

namespace KeyTracingAPI.Middleware
{
    public class TokenCatchMiddleware
    {
        private readonly RequestDelegate _next;
        ILogger<TokenCatchMiddleware> _logger;
        public TokenCatchMiddleware(RequestDelegate next, ILogger<TokenCatchMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext, AppDbContext dbContext)
        {
            string? headerToken = httpContext.Request.Headers.Authorization;

            await _next(httpContext);

            if (httpContext.Response.StatusCode == StatusCodes.Status401Unauthorized)
            {
                string details = headerToken != null ? "Invalid Token" : "Not Authenticated";

                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;

                httpContext.Response.ContentType = "application/json";

                var problemDetails = new
                {
                    title = "Authorization Issue",
                    details = details
                };

                var json = JsonSerializer.Serialize(problemDetails);

                await httpContext.Response.WriteAsync(json);
            }
        }
    }
}
