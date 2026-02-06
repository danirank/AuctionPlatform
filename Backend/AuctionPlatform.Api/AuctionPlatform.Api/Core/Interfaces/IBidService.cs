using AuctionPlatform.Api.Core.Services;
using AuctionPlatform.Api.Data.DTO;

namespace AuctionPlatform.Api.Core.Interfaces
{
    public interface IBidService
    {
        Task<Result<AddBidResponseDto>> AddBidAsync(AddBidDto dto);
        Task<Result<DeleteBidResponseDto>> DeleteAsync(DeleteBidDto dto);
    }
}
