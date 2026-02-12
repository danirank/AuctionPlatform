using AuctionPlatform.Api.Data.Entities;
using AuctionPlatform.Api.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AuctionPlatform.Api.Data.Repos
{

    public class BidRepo : IBidRepo
    {

        private readonly AppDbContext _context;

        public BidRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Bid?> AddAsync(Bid bid)
        {
            var result = await _context.Bids.AddAsync(bid);

            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<List<Bid>> BidsByAuctionId(int auctionId)
        {
            var result = await _context.Bids
                .AsNoTracking()
                .Where(b => b.AuctionId == auctionId)
                .Include(u => u.User)
                .OrderByDescending(b => b.BidAmount)
                .ToListAsync();

            return result;
        }

        public async Task<Bid?> HighestBidByAuctionId(int auctionId)
        {
            return await _context.Bids.Include(u => u.User)
                .Where(b => b.AuctionId == auctionId)
                .OrderByDescending(b => b.BidAmount)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> DeleteAsync(int bidId)
        {
            var bid = await _context.Bids.FindAsync(bidId);

            if (bid == null)
                return false;

            _context.Bids.Remove(bid);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Bid?> FindByIdAsync(int bidId)
        {
            return await _context.Bids.FirstOrDefaultAsync(b => b.Id == bidId);
        }

        public async Task<List<Bid>> GetBidByUserId(string userId)
        {
            return await _context.Bids.Include(u => u.User)
                .Where(b => b.UserId == userId).ToListAsync();
        }
    }
}
