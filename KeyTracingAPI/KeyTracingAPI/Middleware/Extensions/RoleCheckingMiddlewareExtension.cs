namespace KeyTracingAPI.Middleware.Extensions
{
    public static class RoleCheckingMiddlewareExtension
    {
        public static IApplicationBuilder UseRoleChecker(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RoleCheckingMiddleware>();
        }
    }
}
