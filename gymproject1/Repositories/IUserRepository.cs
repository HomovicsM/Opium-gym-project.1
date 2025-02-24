using gymproject1.Models;

namespace gymproject1.Repositories
{
    public interface IUserRepository
    {
        User? GetByEmail(string email);
        void Add(User user);
        IEnumerable<User> GetAll();
    }
}
