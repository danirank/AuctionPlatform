using AuctionPlatform.Api.Core.Interfaces;
using AuctionPlatform.Api.Data.Constants;
using AuctionPlatform.Api.Data.DTO;
using AuctionPlatform.Api.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuctionPlatform.Api.Core.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _config;
        public UserService(UserManager<AppUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }

        public async Task<Result<CreateUserResponseDto>> AddAsync(CreateUserDto dto)
        {

            var entity = new AppUser
            {
                UserName = dto.UserName,
                Email = dto.Email,
                FirstName = dto.FirsName,
                LastName = dto.LastName
            };

            var result = await _userManager.CreateAsync(entity, dto.Password);

            if (!result.Succeeded)
                return Result<CreateUserResponseDto>.Fail(ErrorMessages.UserCredentialsMissing);


            var addRole = dto.IsAdmin ?
                await _userManager.AddToRolesAsync(entity, new List<string> { Roles.Admin, Roles.User })
                : await _userManager.AddToRoleAsync(entity, Roles.User);
            if (!addRole.Succeeded)
                return Result<CreateUserResponseDto>.Fail(ErrorMessages.FailedAddingRole);
            var roles = await _userManager.GetRolesAsync(entity);

            var resDto = new CreateUserResponseDto
            {
                Id = entity.Id,
                Email = entity.Email,
                UserName = entity.UserName,
                Roles = roles

            };

            return Result<CreateUserResponseDto>.Ok(resDto);



        }

        public async Task<IEnumerable<string>> GetUserRoles(AppUser user)
        {

            return await _userManager.GetRolesAsync(user);
        }

        public async Task<string> GenerateToken(AppUser user)
        {


            var claims = new List<Claim>
                {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName ?? ""),
                new Claim(ClaimTypes.Email, user.Email ?? ""),

                };

            var userRoles = await GetUserRoles(user);

            claims.AddRange(
                userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

            var secretKey = _config["JwtSettings:Key"];
            var issuer = _config["JwtSettings:Issuer"];
            var audience = _config["JwtSettings:Audience"];

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }


        public async Task<Result<LoginResponseDto>> LoginAsync(LoginDto dto)
        {
            var userEntity = dto.UserNameOrEmail.Contains("@") ?
                 await _userManager.FindByEmailAsync(dto.UserNameOrEmail)
                 : await _userManager.FindByNameAsync(dto.UserNameOrEmail);

            if (userEntity is null)
                return Result<LoginResponseDto>.Fail(ErrorMessages.UserNotFound);

            var result = await _userManager.CheckPasswordAsync(userEntity, dto.Password);

            if (!result)
                return Result<LoginResponseDto>.Fail(ErrorMessages.WrongPassword);

            var token = await GenerateToken(userEntity);

            var responseDto = new LoginResponseDto { Token = token };

            return Result<LoginResponseDto>.Ok(responseDto);
        }
    }

}
