using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gymproject.Models;
[Table("users")]

public partial class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public bool IsAdmin { get; set; }
}
