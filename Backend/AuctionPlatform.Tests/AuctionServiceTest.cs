using AuctionPlatform.Api.Data.Constants;
using AuctionPlatform.Api.Data.Entities;
using AuctionPlatform.Api.Data.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;
using System.ComponentModel.DataAnnotations;

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


            _auctionRepoMock.Setup(r => r.GetAllAsync(string.Empty)).ReturnsAsync(list);

            var result = await _sut.GetAllAsync("");


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

    }

    public class UpdateAuctionDto
    {
        [StringLength(50, MinimumLength = 2)]
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public decimal? StartPrice { get; set; }
        public DateTime? newEndDateUtc { get; set; }
    }
    public class UpdateAuctionResponseDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }

        public bool IsOpen { get; set; }

        public decimal StartPrice { get; set; }

        public string? ImageUrl { get; set; }


    }
    public class CreateAuctionResponeDto
    {
        public int AuctionId { get; set; }

        public string? UserId { get; set; }

        public bool IsOpen { get; set; }
    }

    public class Result<T>
    {
        public bool IsSucces { get; private set; }

        public string? Error { get; private set; }
        public T? Data { get; private set; }

        private Result() { }

        public static Result<T> Ok(T data)
        {
            return new Result<T>
            {
                IsSucces = true,
                Data = data
            };
        }




        public static Result<T> Fail(string error)
        {
            return new Result<T>
            {
                IsSucces = false,
                Error = error
            };
        }
    }

    public class CreateAuctionDto
    {
        [StringLength(50, MinimumLength = 2)]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public DateTime StartAtUtc { get; set; } = DateTime.Now;

        public DateTime EndAtUtc { get; set; } = DateTime.Now.AddDays(7);



    }

    public interface IAuctionService
    {
        Task<Result<CreateAuctionResponeDto?>> AddAsync(CreateAuctionDto dto, string userId);
        Task<Result<UpdateAuctionResponseDto>> UpdateAsync(UpdateAuctionDto dto, int auctionId);

        Task<Result<List<AuctionsGetResponseDto>>> GetAllAsync(string search);
        Task<Result<List<AuctionsGetResponseDto>>> GetAllOpenAsync();


    }

    public class AuctionsGetResponseDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public bool IsOpen { get; set; }

        public DateTime StartDateUtc { get; set; }
        public DateTime EndDateUtc { get; set; }



    }

    public class AuctionService : IAuctionService
    {
        private readonly IAuctionRepo _repo;
        private readonly IBidRepo _bidRepo;

        public AuctionService(IAuctionRepo repo, IBidRepo bidRepo)
        {
            _repo = repo;
            _bidRepo = bidRepo;
        }

        public async Task<Result<CreateAuctionResponeDto?>> AddAsync(CreateAuctionDto dto, string userId)
        {
            var entity = new Auction
            {

                Title = dto.Title,
                Description = dto.Description,
                StartAtUtc = dto.StartAtUtc,
                EndAtUtc = dto.EndAtUtc,
                UserId = userId,

            };

            var result = await _repo.AddAsync(entity);



            if (result is null)
                return Result<CreateAuctionResponeDto?>.Fail(ErrorMessages.AddEntityFailed);


            var responeDto = new CreateAuctionResponeDto
            {
                AuctionId = result.AuctionId,
                UserId = result.UserId,
                IsOpen = result.IsOpen
            };

            return Result<CreateAuctionResponeDto?>.Ok(responeDto);

        }

        public async Task<Result<List<AuctionsGetResponseDto>>> GetAllAsync(string search)
        {
            var result = await _repo.GetAllAsync("");

            var dto = result.Select(a => new AuctionsGetResponseDto
            {
                Id = a.AuctionId,
                Title = a.Title,
                Description = a.Description,
                IsOpen = a.IsOpen,
                ImageUrl = a.ImageUrl ?? string.Empty

            }).ToList();

            return Result<List<AuctionsGetResponseDto>>.Ok(dto);
        }

        public async Task<Result<List<AuctionsGetResponseDto>>> GetAllOpenAsync()
        {
            var result = await _repo.GetAllOpenAsync();

            var dto = result.Select(a => new AuctionsGetResponseDto
            {
                Id = a.AuctionId,
                Title = a.Title,
                Description = a.Description,
                IsOpen = a.IsOpen,
                ImageUrl = a.ImageUrl ?? string.Empty

            }).ToList();

            return Result<List<AuctionsGetResponseDto>>.Ok(dto);
        }


        public async Task<Result<UpdateAuctionResponseDto>> UpdateAsync(UpdateAuctionDto dto, int auctionId)
        {
            var bids = await _bidRepo.BidsByAuctionId(auctionId) ?? new List<Bid>();

            if (bids.Any())
                return Result<UpdateAuctionResponseDto>.Fail(ErrorMessages.BidExistsOnPriceUpdate);

            var entity = await _repo.FindByIdAsync(auctionId);

            if (entity is null)
                return Result<UpdateAuctionResponseDto>.Fail(ErrorMessages.EntityWithIdNotFound);

            entity.Title = dto.Title ?? entity.Title;
            entity.Description = dto.Description ?? entity.Description;
            entity.StartPrice = dto.StartPrice ?? entity.StartPrice;
            entity.EndAtUtc = dto.newEndDateUtc ?? entity.EndAtUtc;
            entity.ImageUrl = dto.ImageUrl ?? entity.ImageUrl;

            var succes = await _repo.SaveChangesAsync();

            if (!succes)
                return Result<UpdateAuctionResponseDto>.Fail(ErrorMessages.FailSaveAsync);

            var responseDto = new UpdateAuctionResponseDto
            {
                Title = entity.Title,
                Description = entity.Description,
                StartPrice = entity.StartPrice,
                ImageUrl = entity.ImageUrl,
                IsOpen = entity.IsOpen

            };


            return Result<UpdateAuctionResponseDto>.Ok(responseDto);

        }
    }
}

