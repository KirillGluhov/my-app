//using KeyTracingAPI.Services.Interfaces;
//using KeyTracingAPI.Services.Middleware;
//using KeyTracingAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using KeyTracingAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using KeyTracingAPI.JWT;
using KeyTracingAPI.Exceptions;
using KeyTracingAPI.Database;
using KeyTracingAPI.Models.Enums;
using KeyTracingAPI.Services.Interfaces;
using KeyTracingAPI.Services;
using KeyTracingAPI.Middleware.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
{
    options.SuppressMapClientErrors = true;
});
builder.Services.AddControllersWithViews().AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Authorize",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Scheme = "Bearer",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "Bearer",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string> ()
        }
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(jwtOptions =>
{
    jwtOptions.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = JwtConfigurations.Issuer,
        ValidateIssuer = true,
        ValidAudience = JwtConfigurations.Audience,
        ValidateAudience = true,
        IssuerSigningKey = JwtConfigurations.GetSymmetricSecurityKey(),
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        LifetimeValidator = (before, expires, token, parameters) =>
        {
            var utcNow = DateTime.UtcNow;
            return before <= utcNow && utcNow < expires;
        }
    };
});
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(Role.Student.ToString(), p => p.RequireClaim("UserRole", Role.Student.ToString()));
    options.AddPolicy(Role.Teacher.ToString(), p => p.RequireClaim("UserRole", Role.Teacher.ToString()));
    options.AddPolicy(Role.Principal.ToString(), p => p.RequireClaim("UserRole", Role.Principal.ToString()));
    options.AddPolicy(Role.Admin.ToString(), p => p.RequireClaim("UserRole", Role.Admin.ToString()));
    options.AddPolicy("TeacherOrStudent", p =>
    {
        p.RequireAssertion(context =>
        {
            return context.User.HasClaim(claim => (claim.Type == "UserRole" && claim.Value == Role.Student.ToString())
            || (claim.Type == "UserRole" && claim.Value == Role.Teacher.ToString())
            );
        });
    });
    options.AddPolicy("PrincipalOrAdmin", p =>
    {
        p.RequireAssertion(context =>
        {
            return context.User.HasClaim(claim => (claim.Type == "UserRole" && claim.Value == Role.Principal.ToString())
            || (claim.Type == "UserRole" && claim.Value == Role.Admin.ToString())
            );
        });
    });
});



builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// Add services to the container.
//builder.Services.AddScoped<TokenValidationMiddleware>();
builder.Services.AddScoped<IUserService, UserServices>();
builder.Services.AddScoped<IKeyService, KeyService>();
builder.Services.AddScoped<IRequestService, RequestService>();

// Add database contexts
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql("Host = 127.0.0.1; Port = 5432; Database = KeyTracing; Username = postgres; Password = 1"));

var corsOrigins = "origins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsOrigins, policy =>
    {
        policy.WithOrigins("https://win.jij.li").AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
/*using var serviceScope = app.Services.CreateScope();
var DbContext = serviceScope.ServiceProvider.GetService<AppDbContext>();
DbContext?.Database.Migrate();*/

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

//app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseRoleChecker();

app.UseTokenCatcher();

app.UseAuthorization();

app.UseExceptionHandler();

app.MapControllers();

app.Run();
