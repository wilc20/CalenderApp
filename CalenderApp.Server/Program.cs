// File: Program.cs
using System;
using CalenderApp.Server.Data;
using CalenderApp.Server.Interfaces;
using CalenderApp.Server.Models;
using CalenderApp.Server.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

/* class Program
{
    static void Main()
    {
        string connectionString = "Server=localhost,1433;Database=master;User Id=sa;Password=YourStrong!Passw0rd;";

        try
        {
            using var connection = new SqlConnection(connectionString);
            connection.Open();
            Console.WriteLine(" Connected to SQL Server successfully.");

            using var command = new SqlCommand("SELECT GETDATE()", connection);
            var result = command.ExecuteScalar();
            Console.WriteLine($" SQL Server Time: {result}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($" Error: {ex.Message}");
        }
    }
}*/


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDBContext>().AddDefaultTokenProviders();


builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None;
    options.LoginPath = "/auth/login";
    options.LogoutPath = "/auth/logout";
});

//builder.Services.AddAuthentication(IdentityConstants.ApplicationScheme).AddCookie(IdentityConstants.ApplicationScheme);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://localhost:52771")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();

    });
});


builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<ICalendarEntryRepository, CalendarEntryRepository>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseAuthentication();


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run(); 
