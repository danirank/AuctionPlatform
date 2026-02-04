using AuctionPlatform.Api.Data.Entities;

namespace AuctionPlatform.Api.Data.Interfaces
{
    public interface IBidRepo
    {
        Task<Bid?> AddAsync(Bid bid);

        Task<bool> DeleteAsync(int bidId);

        Task<List<Bid>> BidsByAuctionId(int auctionId);
    }
}
