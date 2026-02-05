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

        public async Task<Auction?> AddAsync(Auction auction)
        {
            var result = await _context.Auctions.AddAsync(auction);
            await _context.SaveChangesAsync();

            return result.Entity;
        }


        public async Task<List<Auction>> GetAllAsync(string titleSearch)
        {
            IQueryable<Auction> query = _context.Auctions;

            if (!string.IsNullOrWhiteSpace(titleSearch))
            {
                query = query.Where(a => a.Title.ToLower().Contains(titleSearch.ToLower()));
            }

            return await query.ToListAsync() ?? new List<Auction>();
        }

        public async Task<List<Auction>> GetAllAsync()
        {

            return await _context.Auctions.ToListAsync();
        }




        public async Task<List<Auction>> GetAllByUserAsync(string userId)
        {
            return await _context.Auctions.Where(a => a.UserId == userId).ToListAsync();
        }

        //Update helpers 
        public async Task<Auction?> FindByIdAsync(int auctionId)
        {

            return await _context.Auctions.FirstOrDefaultAsync(a => a.AuctionId == auctionId);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

        public async Task<List<Auction>> GetAllOpenAsync()
        {
            return await _context.Auctions.Where(a => a.IsOpen == true).ToListAsync();
        }
    }
}
