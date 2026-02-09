using AuctionPlatform.Api.Core.Interfaces;
using AuctionPlatform.Api.Data.Constants;
using AuctionPlatform.Api.Data.DTO;
using AuctionPlatform.Api.Data.Entities;
using AuctionPlatform.Api.Data.Interfaces;

namespace AuctionPlatform.Api.Core.Services
{
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
                StartPrice = dto.StartPrice,
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

        public async Task<Result<UpdateAuctionResponseDto>> DeActivateAuction(AdminDeactivateAuctionDto dto, int auctionId)
        {
            var auction = await _repo.FindByIdAsync(auctionId);

            if (auction is null)
                return Result<UpdateAuctionResponseDto>.Fail(ErrorMessages.EntityWithIdNotFound);

            auction.IsDeactivatedByAdmin = dto.IsDeactivatedByAdmin;

            var result = await _repo.SaveChangesAsync();

            if (!result)
                return Result<UpdateAuctionResponseDto>.Fail(ErrorMessages.FailSaveAsync);

            var respDto = new UpdateAuctionResponseDto
            {
                Title = auction.Title,
                Description = auction.Description,
                ImageUrl = auction.ImageUrl,
                StartPrice = auction.StartPrice,
                IsDeactivatedByAdmin = auction.IsDeactivatedByAdmin

            };

            return Result<UpdateAuctionResponseDto>.Ok(respDto);




        }

        public async Task<Result<List<AuctionsGetResponseDto>>> GetAllAsync(string search)
        {
            var result = await _repo.GetAllAsync(search);


            var dto = result.Select(a => new AuctionsGetResponseDto
            {
                Id = a.AuctionId,
                Title = a.Title,
                Description = a.Description,
                StartPrice = a.StartPrice,
                IsOpen = a.IsOpen,
                ImageUrl = a.ImageUrl ?? string.Empty,
                StartDateUtc = a.StartAtUtc,
                EndDateUtc = a.EndAtUtc,
                IsDeactivatedByAdmin = a.IsDeactivatedByAdmin



            }).ToList();

            foreach (var a in dto)
            {
                var highestBid = await _bidRepo.HighestBidByAuctionId(a.Id);

                if (highestBid != null)
                {
                    a.HighestBid = new BidsGetDto
                    {
                        BidAmount = highestBid.BidAmount,
                        UserName = highestBid.User?.UserName,
                        BidDateTime = highestBid.BidTimeUtc
                    };
                }

            }

            return Result<List<AuctionsGetResponseDto>>.Ok(dto);
        }
        public async Task<Result<List<AuctionsGetResponseDto>>> GetAllAsync()
        {
            var result = await _repo.GetAllAsync();

            var dto = result.Select(a => new AuctionsGetResponseDto
            {
                Id = a.AuctionId,
                Title = a.Title,
                Description = a.Description,
                StartPrice = a.StartPrice,
                IsOpen = a.IsOpen,
                ImageUrl = a.ImageUrl ?? string.Empty,
                StartDateUtc = a.StartAtUtc,
                EndDateUtc = a.EndAtUtc,
                IsDeactivatedByAdmin = a.IsDeactivatedByAdmin


            }).ToList();
            foreach (var a in dto)
            {
                var highestBid = await _bidRepo.HighestBidByAuctionId(a.Id);

                if (highestBid != null)
                {
                    a.HighestBid = new BidsGetDto
                    {
                        BidAmount = highestBid.BidAmount,
                        UserName = highestBid.User?.UserName,
                        BidDateTime = highestBid.BidTimeUtc
                    };
                }

            }

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
                StartPrice = a.StartPrice,
                IsOpen = a.IsOpen,
                ImageUrl = a.ImageUrl ?? string.Empty,
                StartDateUtc = a.StartAtUtc,
                EndDateUtc = a.EndAtUtc,
                IsDeactivatedByAdmin = a.IsDeactivatedByAdmin


            }).ToList();
            foreach (var a in dto)
            {
                var highestBid = await _bidRepo.HighestBidByAuctionId(a.Id);

                if (highestBid != null)
                {
                    a.HighestBid = new BidsGetDto
                    {
                        BidAmount = highestBid.BidAmount,
                        UserName = highestBid.User?.UserName,
                        BidDateTime = highestBid.BidTimeUtc
                    };
                }

            }
            return Result<List<AuctionsGetResponseDto>>.Ok(dto);
        }

        public async Task<Result<List<AuctionsGetResponseDto>>> GetAllOpenAsync(string search)
        {
            var result = await _repo.GetAllOpenAsync(search);

            var dto = result.Select(a => new AuctionsGetResponseDto
            {
                Id = a.AuctionId,
                Title = a.Title,
                Description = a.Description,
                StartPrice = a.StartPrice,
                IsOpen = a.IsOpen,
                ImageUrl = a.ImageUrl ?? string.Empty,
                StartDateUtc = a.StartAtUtc,
                EndDateUtc = a.EndAtUtc,
                IsDeactivatedByAdmin = a.IsDeactivatedByAdmin


            }).ToList();
            foreach (var a in dto)
            {
                var highestBid = await _bidRepo.HighestBidByAuctionId(a.Id);

                if (highestBid != null)
                {
                    a.HighestBid = new BidsGetDto
                    {
                        BidAmount = highestBid.BidAmount,
                        UserName = highestBid.User?.UserName,
                        BidDateTime = highestBid.BidTimeUtc
                    };
                }

            }

            return Result<List<AuctionsGetResponseDto>>.Ok(dto);
        }

        public async Task<Result<UpdateAuctionResponseDto>> UpdateAsync(UpdateAuctionDto dto, int auctionId, string userId)
        {
            var bids = await _bidRepo.BidsByAuctionId(auctionId) ?? new List<Bid>();

            if (bids.Any() && dto.StartPrice is not null)
                return Result<UpdateAuctionResponseDto>.Fail(ErrorMessages.BidExistsOnPriceUpdate);

            var entity = await _repo.FindByIdAsync(auctionId);

            if (entity is null)
                return Result<UpdateAuctionResponseDto>.Fail(ErrorMessages.EntityWithIdNotFound);

            if (entity.UserId != userId)
                return Result<UpdateAuctionResponseDto>.Fail(ErrorMessages.UpdateElsesAuction);

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
                IsOpen = entity.IsOpen,
                IsDeactivatedByAdmin = entity.IsDeactivatedByAdmin


            };


            return Result<UpdateAuctionResponseDto>.Ok(responseDto);

        }
    }
}
