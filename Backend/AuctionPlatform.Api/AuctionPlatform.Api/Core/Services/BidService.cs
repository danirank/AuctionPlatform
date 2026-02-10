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

        public async Task<Result<AddBidResponseDto>> AddBidAsync(AddBidDto dto, string userId)
        {
            var auctionExists = await _auctionRepo.FindByIdAsync(dto.AuctionId);

            if (auctionExists is null)
                return Result<AddBidResponseDto>.Fail(ErrorMessages.EntityWithIdNotFound);

            if (!auctionExists.IsOpen)
                return Result<AddBidResponseDto>.Fail(ErrorMessages.AuctionIsClose);

            if (dto.Amount < auctionExists.StartPrice)
                return Result<AddBidResponseDto>.Fail(ErrorMessages.BidLowerThanStrtSprice);


            if (auctionExists.UserId == userId)
                return Result<AddBidResponseDto>.Fail(ErrorMessages.BidOnOwnAuction);


            var highestBid = await _bidRepo.HighestBidByAuctionId(dto.AuctionId);



            if (highestBid?.BidAmount >= dto.Amount && highestBid is not null)
                return Result<AddBidResponseDto>.Fail(ErrorMessages.HigherBidExists);

            var bidEntity = new Bid
            {
                BidAmount = dto.Amount,
                UserId = userId,
                AuctionId = dto.AuctionId


            };

            var result = await _bidRepo.AddAsync(bidEntity);

            if (result is null)
                return Result<AddBidResponseDto>.Fail(ErrorMessages.AddEntityFailed);

            var responseDto = new AddBidResponseDto
            {
                UserId = result.UserId ?? string.Empty,
                AuctionId = result.AuctionId,
                BidId = result.Id,
                BidDateTime = result.BidTimeUtc,
                Amount = result.BidAmount


            };

            return Result<AddBidResponseDto>.Ok(responseDto);

        }

        public async Task<Result<DeleteBidResponseDto>> DeleteAsync(DeleteBidDto dto, string userId)
        {
            var auctionEntity = await _auctionRepo.FindByIdAsync(dto.AuctionId);

            if (auctionEntity is null)
                return Result<DeleteBidResponseDto>.Fail(ErrorMessages.EntityWithIdNotFound);

            if (!auctionEntity.IsOpen)
                return Result<DeleteBidResponseDto>.Fail(ErrorMessages.AuctionIsClose);



            var bidEntity = await _bidRepo.FindByIdAsync(dto.BidId);

            if (bidEntity is null)
                return Result<DeleteBidResponseDto>.Fail(ErrorMessages.EntityWithIdNotFound);

            var highetstBid = await _bidRepo.HighestBidByAuctionId(dto.AuctionId);

            if (highetstBid is null)
                return Result<DeleteBidResponseDto>.Fail(ErrorMessages.EntityWithIdNotFound);



            if (bidEntity.BidAmount < highetstBid.BidAmount)
                return Result<DeleteBidResponseDto>.Fail(ErrorMessages.BidIsNotLatest);

            if (bidEntity.UserId != userId)
                return Result<DeleteBidResponseDto>.Fail(ErrorMessages.DeleteBidThatIsNotUsers);

            var result = await _bidRepo.DeleteAsync(dto.BidId);

            if (!result)
                return Result<DeleteBidResponseDto>.Fail(ErrorMessages.FailSaveAsync);

            var responseDto = new DeleteBidResponseDto
            {
                Message = ResponseMessages.DeleteSucces
            };

            return Result<DeleteBidResponseDto>.Ok(responseDto);
        }

        public async Task<Result<List<BidsGetDto>>> GetBidsForAuction(int auctionId)
        {
            var bidsList = await _bidRepo.BidsByAuctionId(auctionId);

            var dto = bidsList.Select(b => new BidsGetDto
            {
                BidId = b.Id,
                BidAmount = b.BidAmount,
                BidDateTime = b.BidTimeUtc,
                UserName = b.User?.UserName
            }).ToList();

            return Result<List<BidsGetDto>>.Ok(dto);


        }

        public async Task<Result<BidsGetDto>> GetHighestBidsForAuction(int auctionId)
        {
            var highestBid = await _bidRepo.HighestBidByAuctionId(auctionId);

            if (highestBid is null)
                return Result<BidsGetDto>.Fail(ErrorMessages.EntityWithIdNotFound);

            var dto = new BidsGetDto
            {

                BidAmount = highestBid.BidAmount,
                BidDateTime = highestBid.BidTimeUtc,
                UserName = highestBid.User?.UserName
            };


            return Result<BidsGetDto>.Ok(dto);
        }
    }


}
