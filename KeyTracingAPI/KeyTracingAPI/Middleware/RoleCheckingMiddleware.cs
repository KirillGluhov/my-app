using KeyTracingAPI.Database;
using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.WideUseModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace KeyTracingAPI.Middleware
{
    public class RoleCheckingMiddleware
    {
        private readonly RequestDelegate _next;
        ILogger<TokenCatchMiddleware> _logger;
        public RoleCheckingMiddleware(RequestDelegate next, ILogger<TokenCatchMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext, AppDbContext dbContext)
        {
            var endpoint = httpContext.GetEndpoint();
            var endpointAuthorizeData = endpoint?.Metadata.GetOrderedMetadata<IAuthorizeData>();
            string? headerToken = httpContext.Request.Headers.Authorization;

            var tokenValue = headerToken?.Substring(7);
            var userEmailClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
            var userRoleClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == "UserRole")?.Value;
            var userFromDB = dbContext.Users.FirstOrDefaultAsync(u => u.Email == userEmailClaim).Result;

            if (endpointAuthorizeData != null && endpointAuthorizeData.Any() && 
                userFromDB != null && 
                userRoleClaim != ((Role)userFromDB.UserRole).ToString())
            {
                httpContext.Response.StatusCode = StatusCodes.Status403Forbidden;

                httpContext.Response.ContentType = "application/json";
                var problemDetails = new
                {
                    title = "Your role has changed, you have to authorize to proceed"
                };
                var json = JsonSerializer.Serialize(problemDetails);
                await httpContext.Response.WriteAsync(json);
                return;
            }
            if(userFromDB != null)
            {
                UserChecker.UserEmail = userFromDB.Email;
                UserChecker.UserId = userFromDB.Id;
            }

            await _next(httpContext);
        }
    }
}
