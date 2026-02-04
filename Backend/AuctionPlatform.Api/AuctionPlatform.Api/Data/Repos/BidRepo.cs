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
            return await _context.Bids.Where(b => b.AuctionId == auctionId).ToListAsync();
        }

        public async Task<bool> DeleteAsync(int bidId)
        {
            var bid = await _context.Bids.FindAsync(bidId);

            if (bid == null)
                return false;

            _context.Bids.Remove(bid);

            return await _context.SaveChangesAsync() > 0;
        }

    }
}
