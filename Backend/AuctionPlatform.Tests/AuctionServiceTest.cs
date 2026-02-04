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

        private readonly Mock<IAuctionRepo> _mockRepo = new();
        private readonly AuctionService _sut;

        public AuctionServiceTest()
        {

            _sut = new AuctionService(_mockRepo.Object);
        }

        [Fact]
        public async Task CreatedAsync_Should_Return_Succes_And_ResponeDto_When_Succes()
        {
            //Arrange 
            var dto = new CreateAuctionDto { Title = "testTitle" };
            var userId = "user1";


            _mockRepo.Setup(r =>
            r.AddAsync(It.IsAny<Auction>()))
                .ReturnsAsync(new Auction { AuctionId = 1, UserId = "user1" });

            //Act 

            var result = await _sut.AddAsync(dto, userId);



            //Assert 
            result.Data.Should().NotBeNull();
            result.Data.Should().BeEquivalentTo(new CreateAuctionResponeDto { AuctionId = 1, UserId = "user1" });
            result.IsSucces.Should().BeTrue();




            _mockRepo.Verify(r => r.AddAsync(It.IsAny<Auction>()), Times.Once);


        }

        [Fact]
        public async Task CreateAsync_Should_Return_ErrorMessage_When_Fail()
        {
            //Arrange 
            var dto = new CreateAuctionDto();
            var userId = "";

            _mockRepo.Setup(r =>
            r.AddAsync(It.IsAny<Auction>()))
                .ReturnsAsync((Auction?)null);

            //Act 

            var result = await _sut.AddAsync(dto, userId);



            //Assert 
            Assert.Equal(result.Error, ErrorMessages.AddEntityFailed);
            Assert.False(result.IsSucces);

            _mockRepo.Verify(r => r.AddAsync(It.IsAny<Auction>()), Times.Once);

        }


    }

    public class CreateAuctionResponeDto
    {
        public int AuctionId { get; set; }

        public string? UserId { get; set; }
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
    }


    public class AuctionService : IAuctionService
    {
        private readonly IAuctionRepo _repo;

        public AuctionService(IAuctionRepo repo)
        {
            _repo = repo;
        }

        public async Task<Result<CreateAuctionResponeDto?>> AddAsync(CreateAuctionDto dto, string userId)
        {
            var entity = new Auction
            {

                Title = dto.Title,
                Description = dto.Description,
                StartAtUtc = dto.StartAtUtc,
                EndAtUtc = dto.EndAtUtc,
                UserId = userId

            };

            var result = await _repo.AddAsync(entity);



            if (result is null)
                return Result<CreateAuctionResponeDto?>.Fail(ErrorMessages.AddEntityFailed);


            var responeDto = new CreateAuctionResponeDto
            {
                AuctionId = result.AuctionId,
                UserId = result.UserId
            };

            return Result<CreateAuctionResponeDto?>.Ok(responeDto);

        }


    }
}

