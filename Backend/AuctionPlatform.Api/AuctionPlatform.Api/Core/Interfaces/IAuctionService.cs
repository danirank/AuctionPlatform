using AuctionPlatform.Api.Core.Services;
using AuctionPlatform.Api.Data.DTO;

namespace AuctionPlatform.Api.Core.Interfaces
{
    public interface IAuctionService
    {
        Task<Result<CreateAuctionResponeDto?>> AddAsync(CreateAuctionDto dto, string userId);
        Task<Result<UpdateAuctionResponseDto>> UpdateAsync(UpdateAuctionDto dto, int auctionId, string userId);
        Task<Result<List<AuctionsGetResponseDto>>> GetAllAsync(string search);
        Task<Result<List<AuctionsGetResponseDto>>> GetAllAsync();
        Task<Result<List<AuctionsGetResponseDto>>> GetAllOpenAsync();
        Task<Result<List<AuctionsGetResponseDto>>> GetAllOpenAsync(string search);
        Task<Result<UpdateAuctionResponseDto>> DeActivateAuction(AdminDeactivateAuctionDto dto, int auctionId);

    }
}
