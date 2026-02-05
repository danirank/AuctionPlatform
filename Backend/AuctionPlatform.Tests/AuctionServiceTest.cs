using AuctionPlatform.Api.Core.Services;
using AuctionPlatform.Api.Data.Constants;
using AuctionPlatform.Api.Data.DTO;
using AuctionPlatform.Api.Data.Entities;
using AuctionPlatform.Api.Data.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;

namespace AuctionPlatform.Tests
{
    public class AuctionServiceTest
    {

        private readonly Mock<IAuctionRepo> _auctionRepoMock = new();
        private readonly Mock<IBidRepo> _bidRepoMock = new();

        private readonly AuctionService _sut;

        public AuctionServiceTest()
        {
            _sut = new AuctionService(
                _auctionRepoMock.Object,
                _bidRepoMock.Object
            );
        }

        [Fact]
        public async Task AddAsync_Should_Return_Succes_And_ResponeDto_When_Succes()
        {
            //Arrange 
            var dto = new CreateAuctionDto { Title = "testTitle" };
            var userId = "user1";


            _auctionRepoMock.Setup(r =>
            r.AddAsync(It.IsAny<Auction>()))
                .ReturnsAsync(new Auction { AuctionId = 1, UserId = "user1" });

            //Act 

            var result = await _sut.AddAsync(dto, userId);



            //Assert 
            result.Data.Should().NotBeNull();
            result.Data.Should().BeEquivalentTo(new CreateAuctionResponeDto { AuctionId = 1, UserId = "user1" });
            result.IsSucces.Should().BeTrue();




            _auctionRepoMock.Verify(r => r.AddAsync(It.IsAny<Auction>()), Times.Once);


        }

        [Fact]
        public async Task AddAsync_Should_Return_ErrorMessage_When_Fail()
        {
            //Arrange 
            var dto = new CreateAuctionDto();
            var userId = "";

            _auctionRepoMock.Setup(r =>
            r.AddAsync(It.IsAny<Auction>()))
                .ReturnsAsync((Auction?)null);

            //Act 

            var result = await _sut.AddAsync(dto, userId);



            //Assert 
            Assert.Equal(result.Error, ErrorMessages.AddEntityFailed);
            Assert.False(result.IsSucces);

            _auctionRepoMock.Verify(r => r.AddAsync(It.IsAny<Auction>()), Times.Once);

        }

        [Fact]
        public async Task UpdateAsync_Should_Return_ErrorMessage_When_TryChangePrice_And_BidExists()
        {
            var dto = new UpdateAuctionDto
            {
                Title = "UpdatedTitle",
                Description = "UpdatedDescription",
                ImageUrl = "image",
                newEndDateUtc = DateTime.UtcNow.AddDays(20),
                StartPrice = 100

            };

            var bids = new List<Bid>
            {
                new Bid
                {
                    AuctionId = 1,
                    UserId = "user2",
                    BidAmount = 50,
                    BidTimeUtc = DateTime.UtcNow
                }
            };

            _bidRepoMock.Setup(r => r.BidsByAuctionId(It.IsAny<int>())).ReturnsAsync(bids);

            _auctionRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>())).ReturnsAsync(new Auction
            {
                AuctionId = 1,
                UserId = "user1",
                Title = "OrgTitle",
                Description = "orgDesc",
                StartPrice = 20,
                StartAtUtc = DateTime.UtcNow,
                EndAtUtc = DateTime.UtcNow.AddDays(5),
                ImageUrl = null,
                Bids = bids

            });


            //Act 
            var result = await _sut.UpdateAsync(dto, 1);

            //Assert 

            result.IsSucces.Should().BeFalse();
            result.Error.Should().Be(ErrorMessages.BidExistsOnPriceUpdate);


        }

        [Fact]
        public async Task UpdateAsync_Should_Return_UpdateResponseDto_When_Succes()
        {
            var dto = new UpdateAuctionDto
            {
                Title = "UpdatedTitle",
                Description = "UpdatedDescription",
                ImageUrl = "image",
                newEndDateUtc = DateTime.UtcNow.AddDays(20),
                StartPrice = 100

            };

            var bids = new List<Bid>
            {
            };

            _bidRepoMock.Setup(r => r.BidsByAuctionId(It.IsAny<int>())).ReturnsAsync(bids);

            _auctionRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>())).ReturnsAsync(new Auction
            {
                AuctionId = 1,
                UserId = "user1",
                Title = "OrgTitle",
                Description = "orgDesc",
                StartPrice = 20,
                StartAtUtc = DateTime.UtcNow,
                EndAtUtc = DateTime.UtcNow.AddDays(5),
                ImageUrl = null,

                Bids = bids

            });

            _auctionRepoMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);

            //Act 
            var result = await _sut.UpdateAsync(dto, 1);

            //Assert 

            result.IsSucces.Should().BeTrue();
            result.Data?.Title.Should().Be("UpdatedTitle");


        }

        [Fact]
        public async Task UpdateAync_Should_Return_NoteFoundMessage_When_Entity_notFound()
        {
            var dto = new UpdateAuctionDto
            {
                Title = "UpdatedTitle",
                Description = "UpdatedDescription",
                ImageUrl = "image",
                newEndDateUtc = DateTime.UtcNow.AddDays(20),
                StartPrice = 100

            };
            _auctionRepoMock.Setup(r => r.FindByIdAsync(It.IsAny<int>())).ReturnsAsync((Auction?)null);

            var result = await _sut.UpdateAsync(dto, 1);

            result.IsSucces.Should().BeFalse();
            result.Error.Should().Be(ErrorMessages.EntityWithIdNotFound);

        }

        [Fact]
        public async Task UpdateAync_Should_Return_FailedSave_When_Entity_NotSaved()
        {
            var dto = new UpdateAuctionDto
            {
                Title = "UpdatedTitle",
                Description = "UpdatedDescription",
                ImageUrl = "image",
                newEndDateUtc = DateTime.UtcNow.AddDays(20),
                StartPrice = 100

            };

            _auctionRepoMock
                .Setup(r => r.FindByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new Auction { AuctionId = 1 });


            _auctionRepoMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(false);

            var result = await _sut.UpdateAsync(dto, 1);

            result.IsSucces.Should().BeFalse();
            result.Error.Should().Be(ErrorMessages.FailSaveAsync);

        }

        [Fact]
        public async Task GetAllAsync_ShouldReturn_Succes_true_And_ListOfAuctions()
        {
            //Jag vill testa om jag får tillbaka en lista. Mocka listan från repo. 

            var list = new List<Auction>
            {
                new Auction {AuctionId = 1, EndAtUtc = DateTime.Now.AddDays(5), Title = "Test1"},
                new Auction {AuctionId = 2, EndAtUtc = DateTime.Now.AddDays(3), Title = "Test2"},
                new Auction {AuctionId = 3, EndAtUtc = DateTime.Now.AddDays(1), Title = "Test3"},
                new Auction {AuctionId = 4, EndAtUtc = DateTime.MinValue, Title = "Test4"},

            };


            _auctionRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(list);

            var result = await _sut.GetAllAsync();


            result.IsSucces.Should().BeTrue();
            result.Data?.Count.Should().Be(4);

        }
        [Fact]
        public async Task GetAllAsync_ShouldReturn_OpenAuctions()
        {


            var list = new List<Auction>
            {
                new Auction {AuctionId = 1, EndAtUtc = DateTime.Now.AddDays(5), Title = "Test1"},
                new Auction {AuctionId = 2, EndAtUtc = DateTime.Now.AddDays(3), Title = "Test2"},
                new Auction {AuctionId = 3, EndAtUtc = DateTime.Now.AddDays(1), Title = "Test3"},
                new Auction {AuctionId = 4, EndAtUtc = DateTime.MinValue, Title = "Test4"},

            };


            _auctionRepoMock.Setup(r => r.GetAllOpenAsync()).ReturnsAsync(list.Where(a => a.IsOpen == true).ToList());

            var result = await _sut.GetAllOpenAsync();


            result.IsSucces.Should().BeTrue();
            result.Data?.Count.Should().Be(3);

        }

        [Fact]
        public async Task GetAllAsync_ShouldReturn_SearchedAuctions()
        {


            var list = new List<Auction>
            {
                new Auction {AuctionId = 1, EndAtUtc = DateTime.Now.AddDays(5), Title = "Test1"},
                new Auction {AuctionId = 2, EndAtUtc = DateTime.Now.AddDays(3), Title = "Test2"},
                new Auction {AuctionId = 3, EndAtUtc = DateTime.Now.AddDays(1), Title = "Test3"},
                new Auction {AuctionId = 4, EndAtUtc = DateTime.MinValue, Title = "Test4"},

            };

            string searchTitle = "te";


            _auctionRepoMock.Setup(r => r.GetAllAsync(searchTitle))
                .ReturnsAsync(list.Where(a => a.Title.ToLower().Contains(searchTitle.ToLower())).ToList());

            var result = await _sut.GetAllAsync(searchTitle);


            result.IsSucces.Should().BeTrue();
            result.Data?.Count.Should().Be(4);

        }

    }
}
