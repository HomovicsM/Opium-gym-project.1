using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Gymproject.Models;

namespace AdminBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        // Memóriában tárolt felhasználók listája
        private static List<User> users = new List<User>();

        // GET: api/users
        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            return Ok(users);
        }

        // POST: api/users
        [HttpPost]
        public ActionResult<User> AddUser([FromBody] User user)
        {
            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Email))
            {
                return BadRequest(new { message = "Hiányzó név vagy email." });
            }

            user.Id = Guid.NewGuid().ToString(); // Fontos: string típus legyen!
            users.Add(user);
            return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(string id)
        {
            var user = users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return NotFound(new { message = "Felhasználó nem található." });
            }

            users.Remove(user);
            return NoContent();
        }
    }
}
