using AuctionPlatform.Api.Core.Services;
using AuctionPlatform.Api.Data.Constants;
using AuctionPlatform.Api.Data.DTO;
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
                Amount = 3
            };


            var result = await _sut.AddBidAsync(addBidDto, "user3");

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
                    Bids = new List<Bid>(),
                    EndAtUtc = DateTime.UtcNow.AddMonths(1)
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

                Amount = bid
            };


            var result = await _sut.AddBidAsync(addBidDto, "user3");

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
                    Bids = new List<Bid>(),
                    EndAtUtc = DateTime.UtcNow.AddMonths(1)

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

                Amount = bid
            };

            var result = await _sut.AddBidAsync(addBidDto, "user3");

            result.IsSucces.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data.Should().BeOfType<AddBidResponseDto>();

        }

        [Fact]
        public async Task AddAsync_ShouldRetur_ErrorMessage_When_TryingBidOwnPost()
        {
            _auctionRepoMock.
                Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new Auction
                {
                    AuctionId = 1,
                    UserId = "user1",
                    Bids = new List<Bid>(),
                    EndAtUtc = DateTime.UtcNow.AddMonths(1)
                });


            var addBidDto = new AddBidDto
            {
                AuctionId = 1,

                Amount = 20
            };

            var result = await _sut.AddBidAsync(addBidDto, "user1");

            result.IsSucces.Should().BeFalse();
            result.Error.Should().Be(ErrorMessages.BidOnOwnAuction);


        }

        [Fact]
        public async Task DeleteBid_ShouldReturn_ErrorMessage_DoesntOwnBid()
        {
            _auctionRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new Auction
                {
                    EndAtUtc = DateTime.UtcNow.AddMonths(1)
                });

            _bidRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new Bid
                {
                    Id = 1,
                    AuctionId = 1,
                    UserId = "user1",
                    BidAmount = 20
                });

            _bidRepoMock.Setup(r => r.HighestBidByAuctionId(It.IsAny<int>()))
                .ReturnsAsync(new Bid { BidAmount = 1 });

            var deleteDto = new DeleteBidDto
            {
                BidId = 1,
            };


            var result = await _sut.DeleteAsync(deleteDto, "user2");

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
                BidId = 1,
            };


            var result = await _sut.DeleteAsync(deleteDto, "user2");

            result.IsSucces.Should().BeFalse();
            result.Error.Should().Be(ErrorMessages.EntityWithIdNotFound);

        }

        [Fact]
        public async Task DeleteBid_ShouldReturnTrueAndSuccesMessage()
        {
            _auctionRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new Auction
                {
                    EndAtUtc = DateTime.UtcNow.AddMonths(1)
                });

            _bidRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new Bid
                {
                    Id = 1,
                    AuctionId = 1,
                    UserId = "user1",
                    BidAmount = 20
                });

            _bidRepoMock.Setup(r => r.HighestBidByAuctionId(It.IsAny<int>()))
                .ReturnsAsync(new Bid
                {
                    Id = 1,
                    AuctionId = 1,
                    UserId = "user1",
                    BidAmount = 20
                });


            _bidRepoMock.Setup(r => r.DeleteAsync(It.IsAny<int>()))
                .ReturnsAsync(true);

            var deleteDto = new DeleteBidDto
            {
                BidId = 1,
            };


            var result = await _sut.DeleteAsync(deleteDto, "user1");

            result.IsSucces.Should().BeTrue();
            result.Data?.Message.Should().Be(ResponseMessages.DeleteSucces);


        }

    }

}
