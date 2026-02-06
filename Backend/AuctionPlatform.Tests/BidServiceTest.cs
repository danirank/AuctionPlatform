using AuctionPlatform.Api.Core.Services;
using AuctionPlatform.Api.Data.Constants;
using AuctionPlatform.Api.Data.Entities;
using AuctionPlatform.Api.Data.Interfaces;
using FluentAssertions;
using Moq;

namespace AuctionPlatform.Tests
{
    public class BidServiceTest
    {
        private readonly Mock<IAuctionRepo> _auctionRepoMock = new();
        private readonly Mock<IBidRepo> _bidRepoMock = new();

        private readonly BidService _sut;

        public BidServiceTest()
        {
            _sut = new BidService(
                _bidRepoMock.Object,
                _auctionRepoMock.Object

            );
        }

        [Fact]

        public async Task AddAsync_ShouldReturn_EntityNotFoundMessage()
        {

            _auctionRepoMock
            .Setup(r => r.FindByIdAsync(2))
            .ReturnsAsync((Auction?)null);


            var addBidDto = new AddBidDto
            {
                AuctionId = 2,
                UserId = "user3",
                Amount = 3
            };


            var result = await _sut.AddBidAsync(addBidDto);

            result.IsSucces.Should().BeFalse();
            result.Error.Should().Be(ErrorMessages.EntityWithIdNotFound);

        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(5)]
        [InlineData(6)]
        public async Task AddAsync_ShouldReturn_HigherBidExists(int bid)
        {
            _auctionRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new Auction
                {
                    AuctionId = 1,
                    UserId = "User1",
                    Bids = new List<Bid>()
                });

            _bidRepoMock.Setup(r => r.HighestBidByAuctionId(It.IsAny<int>()))
                .ReturnsAsync(new Bid
                {
                    AuctionId = 1,
                    BidAmount = 10,
                    UserId = "user2"
                });


            var addBidDto = new AddBidDto
            {
                UserId = "user3",
                Amount = bid
            };


            var result = await _sut.AddBidAsync(addBidDto);

            result.IsSucces.Should().BeFalse();
            result.Error.Should().Be(ErrorMessages.HigherBidExists);

        }

        [Theory]
        [InlineData(12)]
        [InlineData(13)]
        [InlineData(14)]
        [InlineData(16)]
        [InlineData(18)]
        [InlineData(15)]
        [InlineData(19)]
        public async Task AddAsync_ShouldReturn_Succes_AddBidDto(int bid)
        {
            _auctionRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new Auction
                {
                    AuctionId = 1,
                    UserId = "User1",
                    Bids = new List<Bid>()
                });

            _bidRepoMock.Setup(r => r.HighestBidByAuctionId(It.IsAny<int>()))
                .ReturnsAsync(new Bid
                {
                    AuctionId = 1,
                    BidAmount = 10,
                    UserId = "user2"
                });



            _bidRepoMock.Setup(r => r.AddAsync(It.IsAny<Bid>())).ReturnsAsync(
                new Bid
                {
                    BidAmount = 10,
                    AuctionId = 1,
                    UserId = "user5"
                });


            var addBidDto = new AddBidDto
            {
                AuctionId = 1,
                UserId = "user3",
                Amount = bid
            };

            var result = await _sut.AddBidAsync(addBidDto);

            result.IsSucces.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data.Should().BeOfType<AddBidResponseDto>();

        }

        [Fact]
        public async Task AddAsync_ShouldRetur_ErrorMessage_When_TryingBidOwnPost()
        {
            _auctionRepoMock.
                Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new Auction { AuctionId = 1, UserId = "user1", Bids = new List<Bid>() });

            var addBidDto = new AddBidDto
            {
                AuctionId = 1,
                UserId = "user1",
                Amount = 20
            };

            var result = await _sut.AddBidAsync(addBidDto);

            result.IsSucces.Should().BeFalse();
            result.Error.Should().Be(ErrorMessages.BidOnOwnAuction);


        }

        [Fact]
        public async Task DeleteBid_ShouldReturn_ErrorMessage_DoesntOwnBid()
        {
            _bidRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new Bid
                {
                    Id = 1,
                    AuctionId = 1,
                    UserId = "user1",
                    BidAmount = 20
                });

            var deleteDto = new DeleteBidDto
            {
                UserId = "user2",
                BidId = 1,
            };


            var result = await _sut.DeleteAsync(deleteDto);

            result.IsSucces.Should().BeFalse();
            result.Error.Should().Be(ErrorMessages.DeleteBidThatIsNotUsers);


        }

        [Fact]
        public async Task DeleteBid_ShouldReturn_ErrorMessage_BidDoesntExist()
        {
            _bidRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync((Bid?)null);

            var deleteDto = new DeleteBidDto
            {
                UserId = "user2",
                BidId = 1,
            };


            var result = await _sut.DeleteAsync(deleteDto);

            result.IsSucces.Should().BeFalse();
            result.Error.Should().Be(ErrorMessages.EntityWithIdNotFound);

        }

        [Fact]
        public async Task DeleteBid_ShouldReturnTrueAndSuccesMessage()
        {

            _bidRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new Bid
                {
                    Id = 1,
                    AuctionId = 1,
                    UserId = "user1",
                    BidAmount = 20
                });

            var deleteDto = new DeleteBidDto
            {
                UserId = "user1",
                BidId = 1,
            };


            var result = await _sut.DeleteAsync(deleteDto);

            result.IsSucces.Should().BeTrue();
            result.Data?.Message.Should().Be(ResponseMessages.DeleteSucces);


        }

    }
    public interface IBidService
    {
        Task<Result<AddBidResponseDto>> AddBidAsync(AddBidDto dto);
        Task<Result<DeleteBidResponseDto>> DeleteAsync(DeleteBidDto dto);
    }


    public class AddBidResponseDto
    {
        public int AuctionId { get; set; }
        public int BidId { get; set; }
        public string UserId { get; set; }
    }

    public class DeleteBidResponseDto
    {
        public string Message { get; set; } = string.Empty;
    }
    public class DeleteBidDto
    {
        public string UserId { get; set; }
        public int BidId { get; set; }
    }

    public class AddBidDto
    {
        public int AuctionId { get; set; }
        public int Amount { get; set; }
        public string? UserId { get; set; }

    }
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
