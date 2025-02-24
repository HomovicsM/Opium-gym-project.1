using gymproject1.Models;
using gymproject1.Models;

namespace gymproject1.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task AddAsync(User user);
        Task<IEnumerable<User>> GetAllAsync();
    }
}
