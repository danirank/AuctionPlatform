using AuctionPlatform.Api.Data.Entities;

namespace AuctionPlatform.Api.Data.Interfaces
{
    public interface IAuctionRepo
    {
        Task<Auction?> AddAsync(Auction auction);
        Task<List<Auction>> GetAllAsync(string titleSearch);
        Task<List<Auction>> GetAllAsync();
        Task<List<Auction>> GetAllByUserAsync(string userId);

        Task<List<Auction>> GetAllOpenAsync();

        //Hjälpmetoder för update -sker i servicelagret 
        Task<Auction?> FindByIdAsync(int auctionId);

        Task<bool> SaveChangesAsync();

    }
}
