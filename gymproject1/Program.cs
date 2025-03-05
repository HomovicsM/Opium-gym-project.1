using gymproject1.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using gymproject1.Data;
using System.Text;
using gymproject1.Models;

var builder = WebApplication.CreateBuilder(args);

// Konfiguráljuk az EF Core-t SQL Server használatával
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Konfiguráljuk a controller-eket
builder.Services.AddControllers();

// JWT hitelesítés beállítása
var jwtSecret = builder.Configuration["Jwt:Secret"] ?? "your_secret_key_here";
var key = Encoding.ASCII.GetBytes(jwtSecret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
    var builder = WebApplication.CreateBuilder(args);

    // Adatbázis kapcsolat beállítása
    builder.Services.AddDbContext<MerchDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

    // CORS engedélyezése frontend számára
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll",
            policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

// 📌 **ALAPÉRTELMEZETT TERMÉKEK HOZZÁADÁSA AZ ADATBÁZISHOZ**
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MerchDbContext>();
    context.Database.Migrate(); // Biztosítsuk, hogy az adatbázis friss

    if (!context.Products.Any()) // Ha nincs még termék
    {
        context.Products.AddRange(new List<Product>
        {
            new Product { Name = "Póló", Image = "/tshirt.jpg", Price = 5000 },
            new Product { Name = "Sapka", Image = "/cap.jpg", Price = 3500 },
            new Product { Name = "Pulóver", Image = "/hoodie.jpg", Price = 9000 },
            new Product { Name = "Bögre", Image = "/mug.jpg", Price = 2500 },
            new Product { Name = "Zokni", Image = "/socks.jpg", Price = 2000 },
            new Product { Name = "Kulacs", Image = "/bottle.jpg", Price = 4500 }
        });

        context.SaveChanges();
    }
}

app.Run();