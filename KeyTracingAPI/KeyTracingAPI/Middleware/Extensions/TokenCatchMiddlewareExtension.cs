namespace KeyTracingAPI.Middleware.Extensions
{
    public static class TokenCatchMiddlewareExtension
    {
        public static IApplicationBuilder UseTokenCatcher(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<TokenCatchMiddleware>();
        }
    }
}
