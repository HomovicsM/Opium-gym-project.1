using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using gymproject1.Models;
using gymproject1.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace gymproject1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _passwordHasher = new PasswordHasher<User>();
        }

        // POST api/auth/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Minden mező kitöltése kötelező!" });
            }

            if (_userRepository.GetByEmail(request.Email) != null)
            {
                return BadRequest(new { message = "Ezzel az email címmel már regisztráltak!" });
            }

            var user = new User
            {
                Username = request.Username,
                Email = request.Email
            };

            // Jelszó hashelése
            user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

            _userRepository.Add(user);

            return StatusCode(201, new { message = "Sikeres regisztráció!" });
        }

        // POST api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Minden mező kitöltése kötelező!" });
            }

            var user = _userRepository.GetByEmail(request.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Érvénytelen email vagy jelszó!" });
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return BadRequest(new { message = "Érvénytelen email vagy jelszó!" });
            }

            var token = GenerateJwtToken(user);

            return Ok(new { message = "Sikeres bejelentkezés!", token });
        }

        // GET api/auth/protected
        [Authorize]
        [HttpGet("protected")]
        public IActionResult Protected()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Ok(new { message = "Védett tartalom", userId });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSecret = _configuration["Jwt:Secret"] ?? "your_secret_key_here";
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSecret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
