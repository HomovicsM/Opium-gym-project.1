using Microsoft.AspNetCore.Mvc;
using gymproject1.Data;
using gymproject1.Services;
using System.Security.Cryptography;
using System.Text;
using gymproject1.Models;

namespace gymproject1.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public AuthController(AppDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
                return BadRequest("Email already exists");

            user.PasswordHash = HashPassword(user.PasswordHash);
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var foundUser = _context.Users.SingleOrDefault(u => u.Email == user.Email);
            if (foundUser == null || foundUser.PasswordHash != HashPassword(user.PasswordHash))
                return Unauthorized("Invalid credentials");

            var token = _authService.GenerateToken(foundUser);
            return Ok(new { Token = token });
        }

        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }
    }
}
