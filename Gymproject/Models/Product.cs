using System;
using System.Collections.Generic;

namespace Gymproject.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public string Image_Url { get; set; } = null!;
}
