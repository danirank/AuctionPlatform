using AuctionPlatform.Api.Core.Services;
using AuctionPlatform.Api.Data.DTO;
using AuctionPlatform.Api.Data.Entities;

namespace AuctionPlatform.Api.Core.Interfaces
{
    public interface IUserService
    {

        Task<Result<CreateUserResponseDto>> AddAsync(RegisterUserDto dto);
        Task<Result<LoginResponseDto>> LoginAsync(LoginDto dto);

        Task<AppUser?> GetUserById(string id);
        Task<Result<GetUserValidationDto>> GetUserByIdDto(string id);

        Task<Result<List<GetUsersDto>>> GetAll();
        Task<Result<List<GetUsersDto>>> GetAll(string search);

        Task<string> GenerateToken(AppUser user);

        Task<IEnumerable<string>> GetUserRoles(AppUser user);

        Task<Result<GetUserDto>> DeActivateUser(UpdateStatusUserDto dto, string userId);

        Task<Result<GetUserDto>> UpdateUser(UpdateUserPasswordDto dto);
    }

}
