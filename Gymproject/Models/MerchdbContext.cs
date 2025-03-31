using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Gymproject.Models;

public partial class MerchdbContext : DbContext
{
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Product> Products { get; set; }


    public virtual DbSet<CartItem> CartItems { get; set; }
    public MerchdbContext()
    {
    }

    public MerchdbContext(DbContextOptions<MerchdbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("cart_items");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.Product)
                .WithMany()
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
    public virtual DbSet<User> User { get; set; }
    public virtual DbSet<Product> Product { get; set; }
    public virtual DbSet<CartItem> CartItem { get; set; }
}
