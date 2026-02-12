using AuctionPlatform.Api.Data.Entities;

namespace AuctionPlatform.Api.Data.Interfaces
{
    public interface IBidRepo
    {
        Task<Bid?> AddAsync(Bid bid);

        Task<Bid?> FindByIdAsync(int bidId);

        Task<bool> DeleteAsync(int bidId);

        Task<List<Bid>> BidsByAuctionId(int auctionId);

        Task<Bid?> HighestBidByAuctionId(int auctionId);

        Task<List<Bid>> GetBidByUserId(string userId);
    }
}
