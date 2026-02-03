using AuctionPlatform.Api.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AuctionPlatform.Api.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {

        public DbSet<Bid> Bids => Set<Bid>();
        public DbSet<Auction> Auctions => Set<Auction>();


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {


        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Bid>()
                .HasOne(b => b.Auction)
                .WithMany(a => a.Bids)
                .HasForeignKey(b => b.AuctionId)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
