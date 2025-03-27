using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using Gymproject.Models;
using System;
using Gymproject.Services;
using Gymproject.Services.Dtos;

namespace Gymproject.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly MerchdbContext _context;
        private readonly AuthService _authService;

        public AuthController(MerchdbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<object> Register(UserDto.RegisterUserDto registerUserDto)
        {
            if (_context.Users.Any(u => u.Email == registerUserDto.email))
                return BadRequest("Email already exists");


            var user = new User
            {
                Username = registerUserDto.UserName,
                Email = registerUserDto.email,
                PasswordHash = HashPassword(registerUserDto.password),
                IsAdmin = false // vagy true, ha adminnak akarod
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login(UserDto.LoginUserDto loginUserDto)
        {
            var foundUser = _context.Users.SingleOrDefault(u => u.Username == loginUserDto.UserName);
            if (foundUser == null || foundUser.PasswordHash != HashPassword(loginUserDto.password))
                return Unauthorized("Invalid credentials");

            //var token = _authService.GenerateToken(foundUser);
            return Ok(new { message= "Sikeres bejelentkezes" });
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