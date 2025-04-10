using Microsoft.AspNetCore.Mvc;

using Gymproject.Models;

namespace Gymproject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        // Admin belépési adatok (nem biztonságos, csak demo célra!)
        private const string AdminUsername = "";
        private const string AdminPassword = "";

        [HttpPost("login")]
        public IActionResult Login([FromBody] AdminCredentials credentials)
        {
            if (credentials.Username == AdminUsername && credentials.Password == AdminPassword)
            {
                return Ok(new { success = true, role = "admin" });
            }

            return Unauthorized(new { success = false, message = "Hibás belépési adatok" });
        }
    }
}
