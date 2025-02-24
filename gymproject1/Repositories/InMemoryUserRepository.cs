using gymproject1.Repositories;
using gymproject1.Models;

namespace gymproject1.Repositories
{
    public class InMemoryUserRepository : IUserRepository
    {
        private readonly List<User> _users = new List<User>();

        public User? GetByEmail(string email)
        {
            return _users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        }

        public void Add(User user)
        {
            user.Id = _users.Count + 1;
            _users.Add(user);
        }

        public IEnumerable<User> GetAll() => _users;
    }
}
