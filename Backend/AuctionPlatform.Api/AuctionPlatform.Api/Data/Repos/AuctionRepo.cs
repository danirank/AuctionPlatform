using AuctionPlatform.Api.Data.Entities;
using AuctionPlatform.Api.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AuctionPlatform.Api.Data.Repos
{
    public class AuctionRepo : IAuctionRepo
    {
        private readonly AppDbContext _context;

        public AuctionRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Auction>> GetAllAsync(string? titleSearch)
        {
            IQueryable<Auction> query = _context.Auctions;

            if (!string.IsNullOrWhiteSpace(titleSearch))
            {
                query = query.Where(a => a.Title.Contains(titleSearch));
            }

            return await query.ToListAsync();
        }


        public async Task<List<Auction>> GetAllByUserAsync(string userId)
        {
            return await _context.Auctions.Where(a => a.UserId == userId).ToListAsync();
        }
    }
}
