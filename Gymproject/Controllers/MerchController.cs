using Gymproject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Gymproject.Services.Dtos;
using Microsoft.EntityFrameworkCore;


namespace Gymproject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class MerchController : ControllerBase
    {
        private readonly MerchdbContext _context;

        public MerchController(MerchdbContext context)
        {
            _context = context;
        }

        // Get all products
        [HttpGet("product")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        // Add item to cart
        [HttpPost("cart")]
        public async Task<IActionResult> AddToCart([FromBody] CartDto cartDto)
        {
            var existingItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.ProductId == cartDto.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += cartDto.Quantity;
                _context.CartItems.Update(existingItem);
            }
            else
            {
                var newCartItem = new CartItem
                {
                    ProductId = cartDto.ProductId,
                    Quantity = cartDto.Quantity
                };
                await _context.CartItems.AddAsync(newCartItem);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Item added to cart successfully!" });
        }

        // Get items in cart
        [HttpGet("cart")]
        public async Task<IActionResult> GetCartItems()
        {
            var cartItems = await _context.CartItems.Include(c => c.Product).ToListAsync();
            return Ok(cartItems);
        }

        // Remove item from cart
        [HttpDelete("cart/{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);
            if (cartItem == null)
                return NotFound("Cart item not found.");

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Item removed from cart." });
        }
    }
}
