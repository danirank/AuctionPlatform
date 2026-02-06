using AuctionPlatform.Api.Core.Services;
using AuctionPlatform.Api.Data.DTO;
using AuctionPlatform.Api.Data.Entities;

namespace AuctionPlatform.Api.Core.Interfaces
{
    public interface IUserService
    {

        Task<Result<CreateUserResponseDto>> AddAsync(CreateUserDto dto);
        Task<Result<LoginResponseDto>> LoginAsync(LoginDto dto);

        Task<string> GenerateToken(AppUser user);

        Task<IEnumerable<string>> GetUserRoles(AppUser user);
    }

}
