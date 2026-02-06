using AuctionPlatform.Api.Core.Interfaces;
using AuctionPlatform.Api.Data.Constants;
using AuctionPlatform.Api.Data.DTO;
using AuctionPlatform.Api.Data.Entities;
using AuctionPlatform.Api.Data.Interfaces;

namespace AuctionPlatform.Api.Core.Services
{
    public class BidService : IBidService
    {
        private readonly IBidRepo _bidRepo;
        private readonly IAuctionRepo _auctionRepo;

        public BidService(IBidRepo bidRepo, IAuctionRepo auctionRepo)
        {
            _bidRepo = bidRepo;
            _auctionRepo = auctionRepo;
        }

        public async Task<Result<AddBidResponseDto>> AddBidAsync(AddBidDto dto)
        {
            var auctionExists = await _auctionRepo.FindByIdAsync(dto.AuctionId);
            if (auctionExists is null)
                return Result<AddBidResponseDto>.Fail(ErrorMessages.EntityWithIdNotFound);

            if (auctionExists.UserId == dto.UserId)
                return Result<AddBidResponseDto>.Fail(ErrorMessages.BidOnOwnAuction);


            var highestBid = await _bidRepo.HighestBidByAuctionId(dto.AuctionId);



            if (highestBid?.BidAmount >= dto.Amount && highestBid is not null)
                return Result<AddBidResponseDto>.Fail(ErrorMessages.HigherBidExists);

            var bidEntity = new Bid
            {
                BidAmount = dto.Amount,
                UserId = dto.UserId,
                AuctionId = dto.AuctionId

            };

            var result = await _bidRepo.AddAsync(bidEntity);

            if (result is null)
                return Result<AddBidResponseDto>.Fail(ErrorMessages.AddEntityFailed);

            var responseDto = new AddBidResponseDto
            {
                UserId = result.UserId ?? string.Empty,
                AuctionId = result.AuctionId,
                BidId = result.Id
            };

            return Result<AddBidResponseDto>.Ok(responseDto);

        }

        public async Task<Result<DeleteBidResponseDto>> DeleteAsync(DeleteBidDto dto)
        {
            var bidEntity = await _bidRepo.FindByIdAsync(dto.BidId);

            if (bidEntity is null)
                return Result<DeleteBidResponseDto>.Fail(ErrorMessages.EntityWithIdNotFound);

            if (bidEntity.UserId != dto.UserId)
                return Result<DeleteBidResponseDto>.Fail(ErrorMessages.DeleteBidThatIsNotUsers);

            var responseDto = new DeleteBidResponseDto
            {
                Message = ResponseMessages.DeleteSucces
            };

            return Result<DeleteBidResponseDto>.Ok(responseDto);
        }
    }

}
