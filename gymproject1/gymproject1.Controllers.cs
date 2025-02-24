using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using gymproject1.Models;
using Microsoft.AspNetCore.Identity.Data;

namespace gymproject1
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        // Itt injektálhatsz egy adatbázis kontextust vagy felhasználókezelő szolgáltatást

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("register")]
        public IActionResult Register(gymproject1.Models.RegisterRequest request)
        {
            // Itt érdemes ellenőrizni, hogy létezik-e már a felhasználónév, illetve validálni az adatokat.
            // Jelen példában feltételezzük, hogy a regisztráció sikeres, és a felhasználó rögzítve lett az adatbázisban.

            // Regisztráció után generálunk egy JWT tokent, amelyet visszaküldünk a frontendnek.
            var token = GenerateJwtToken(request.Username);
            return Ok(new { token });
        }

        private string GenerateJwtToken(string username)
        {
            var jwtSettings = _configuration.GetSection("AuthSettings:JwtOptions");
            var secret = jwtSettings.GetValue<string>("Secret");
            var issuer = jwtSettings.GetValue<string>("Issuer");
            var audience = jwtSettings.GetValue<string>("Audience");

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username)
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7), // A token 7 napig érvényes
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
