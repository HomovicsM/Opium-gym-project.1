namespace Gymproject.Services.Dtos
{
    public class UserDto
    {
        public record RegisterUserDto(string UserName, string password, string email);
        public record LoginUserDto(string UserName, string password);
    }
}
