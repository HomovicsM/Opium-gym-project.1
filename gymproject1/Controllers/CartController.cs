using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gymproject1.Data;
using gymproject1.Models;

namespace gymproject1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly MerchDbContext _context;

        public CartController(MerchDbContext context)
        {
            _context = context;
        }

        // GET: api/cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
            return await _context.CartItems.ToListAsync();
        }

        // POST: api/cart
        [HttpPost]
        public async Task<ActionResult<CartItem>> AddToCart(CartItem item)
        {
            _context.CartItems.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCartItems), new { id = item.Id }, item);
        }

        // DELETE: api/cart/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var item = await _context.CartItems.FindAsync(id);
            if (item == null) return NotFound();

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
