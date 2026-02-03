using AuctionPlatform.Api.Data.Entities;

namespace AuctionPlatform.Api.Data.Interfaces
{
    public interface IAuctionRepo
    {
        Task<List<Auction>> GetAllAsync(string? titleSearch);

        Task<List<Auction>> GetAllByUserAsync(string userId);

    }
}
