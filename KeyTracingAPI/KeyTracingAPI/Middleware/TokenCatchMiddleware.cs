using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using System;
using System.Text.Json;

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

        public async Task Invoke(HttpContext httpContext)
        {
            await _next(httpContext);

            if(httpContext.Response.StatusCode == StatusCodes.Status401Unauthorized)
            {
                _logger.LogInformation(httpContext.Request.Headers["Authorization"]);

                //tut lovit tokeni, esli 401 po idee nado udaliat iz bd evo

                httpContext.Response.ContentType = "application/json";
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;

                var problemDetails = new
                {
                    title = "slozno"
                };

                var json = JsonSerializer.Serialize(problemDetails);

                await httpContext.Response.WriteAsync(json);
            }
        }
    }
}
