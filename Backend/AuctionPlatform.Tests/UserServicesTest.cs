using AuctionPlatform.Api.Core.Services;
using AuctionPlatform.Api.Data.Constants;
using AuctionPlatform.Api.Data.Entities;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;


namespace AuctionPlatform.Tests
{


    public class UserServiceTest
    {
        [Fact]
        public async Task CreateUmAsync_should_Return_ErrorIfMissingInfo()
        {
            var provider = IdentityTestFactory.BuildProvider();
            var userManager = provider.GetRequiredService<UserManager<AppUser>>();

            var createUserdDto = new CreateUserDto
            {
                UserName = null,
                Email = null,
                Password = "test",
                FirsName = null,
                LastName = null,

            };

            var entity = new AppUser
            {
                UserName = createUserdDto.UserName,
                Email = createUserdDto.Email,
                FirstName = createUserdDto.FirsName,
                LastName = createUserdDto.LastName
            };

            var result = await userManager.CreateAsync(entity, createUserdDto.Password);

            result.Succeeded.Should().BeFalse();
            result.Errors.Should().HaveCount(1);
        }

        [Fact]
        public async Task CreateUmAsync_should_Return_trueIfSucces()
        {
            var provider = IdentityTestFactory.BuildProvider();
            var userManager = provider.GetRequiredService<UserManager<AppUser>>();

            var createUserdDto = new CreateUserDto
            {
                UserName = "Test",
                Email = "test@mail.com",
                Password = "test",
                FirsName = "first",
                LastName = "last",

            };

            var entity = new AppUser
            {
                UserName = createUserdDto.UserName,
                Email = createUserdDto.Email,
                FirstName = createUserdDto.FirsName,
                LastName = createUserdDto.LastName
            };

            var result = await userManager.CreateAsync(entity, createUserdDto.Password);

            result.Succeeded.Should().BeTrue();
            result.Errors.Should().HaveCount(0);

        }

        [Fact]

        public async Task CreateUmAsync_should_Return_fasleIfUserCredentialAlreadyExists()
        {
            var provider = IdentityTestFactory.BuildProvider();
            var userManager = provider.GetRequiredService<UserManager<AppUser>>();

            var createUserdDto = new CreateUserDto
            {
                UserName = "Test",
                Email = "test@mail.com",
                Password = "test",
                FirsName = "first",
                LastName = "last",

            };
            var createUserdDto2 = new CreateUserDto
            {
                UserName = "Test",
                Email = "test@mail.com",
                Password = "test2",
                FirsName = "first",
                LastName = "last",

            };

            var entity = new AppUser
            {
                UserName = createUserdDto.UserName,
                Email = createUserdDto.Email,
                FirstName = createUserdDto.FirsName,
                LastName = createUserdDto.LastName
            };
            var entity2 = new AppUser
            {
                UserName = createUserdDto2.UserName,
                Email = createUserdDto2.Email,
                FirstName = createUserdDto2.FirsName,
                LastName = createUserdDto2.LastName
            };

            var result = await userManager.CreateAsync(entity, createUserdDto.Password);
            var result2 = await userManager.CreateAsync(entity2, createUserdDto.Password);

            result.Succeeded.Should().BeTrue();
            result.Errors.Should().HaveCount(0);
            result2.Succeeded.Should().BeFalse();
            result2.Errors.Should().HaveCount(1);


        }

        [Fact]
        public async Task AddAsync_should_return_errorMessage_invalidCredentials()
        {
            var provider = IdentityTestFactory.BuildProvider();
            var userManager = provider.GetRequiredService<UserManager<AppUser>>();
            var config = IdentityTestFactory.CreateTestConfig();
            var _sut = new UserService(userManager, config);

            var createUserdDto = new CreateUserDto
            {
                UserName = null,
                Email = null,
                Password = "test",
                FirsName = null,
                LastName = null,

            };

            var result = await _sut.AddAsync(createUserdDto);

            result.Error.Should().Be(ErrorMessages.UserCredentialsMissing);
            result.IsSucces.Should().BeFalse();

        }


        [Fact]
        public async Task AddAsync_should_return_responseDto()
        {
            var provider = IdentityTestFactory.BuildProvider();
            var userManager = provider.GetRequiredService<UserManager<AppUser>>();
            var roleamnager = provider.GetRequiredService<RoleManager<IdentityRole>>();
            var config = IdentityTestFactory.CreateTestConfig();
            var _sut = new UserService(userManager, config);

            await roleamnager.CreateAsync(new IdentityRole(Roles.Admin));
            await roleamnager.CreateAsync(new IdentityRole(Roles.User));

            var createUserdDto = new CreateUserDto
            {
                UserName = "Test",
                Email = "Test",
                Password = "test",
                FirsName = "Test",
                LastName = "Test",

            };

            var result = await _sut.AddAsync(createUserdDto);


            result.IsSucces.Should().BeTrue();
            result.Data?.Id.Should().NotBeNull();

        }

        [Fact]
        public async Task AddAsync_should_add_UserWithRole_Admin()
        {
            var provider = IdentityTestFactory.BuildProvider();
            var userManager = provider.GetRequiredService<UserManager<AppUser>>();
            var roleamnager = provider.GetRequiredService<RoleManager<IdentityRole>>();
            var config = IdentityTestFactory.CreateTestConfig();
            var _sut = new UserService(userManager, config);

            await roleamnager.CreateAsync(new IdentityRole(Roles.Admin));
            await roleamnager.CreateAsync(new IdentityRole(Roles.User));

            var dto = new CreateUserDto
            {
                UserName = "adim2",
                Email = "Test2",
                Password = "test2",
                FirsName = "Tes2t",
                LastName = "Test2",
                IsAdmin = true
            };
            var dto2 = new CreateUserDto
            {
                UserName = "adim1",
                Email = "Test",
                Password = "test",
                FirsName = "Test",
                LastName = "Test",
                IsAdmin = false
            };

            var result = await _sut.AddAsync(dto);
            var result2 = await _sut.AddAsync(dto2);


            result.Data?.Roles.Should().Contain(Roles.Admin);
            result.Data?.Roles.Should().Contain(Roles.User);
            result2.Data?.Roles.Should().Contain(Roles.User);




        }

        [Fact]

        public async Task LoginAsync_Generate_Token_Returs_Token()
        {
            var provider = IdentityTestFactory.BuildProvider();
            var userManager = provider.GetRequiredService<UserManager<AppUser>>();
            var roleamnager = provider.GetRequiredService<RoleManager<IdentityRole>>();
            var config = IdentityTestFactory.CreateTestConfig();
            var _sut = new UserService(userManager, config);



            await roleamnager.CreateAsync(new IdentityRole(Roles.Admin));
            await roleamnager.CreateAsync(new IdentityRole(Roles.User));

            var dto = new CreateUserDto
            {
                UserName = "adim2",
                Email = "Test2",
                Password = "test2",
                FirsName = "Tes2t",
                LastName = "Test2",
                IsAdmin = true
            };
            var dto2 = new CreateUserDto
            {
                UserName = "adim1",
                Email = "Test",
                Password = "test",
                FirsName = "Test",
                LastName = "Test",
                IsAdmin = false
            };

            await _sut.AddAsync(dto);

            var logIndto = new LoginDto
            {
                UserNameOrEmail = "adim2",
                Password = "test2",
            };


            var result = await _sut.LoginAsync(logIndto);

            result.IsSucces.Should().BeTrue();
            result.Data.Should().NotBeNull();
            result.Data.Should().BeOfType<LoginResponseDto>();


        }
        [Fact]
        public async Task LoginAsync_ShouldReturn_UserNotFoundErrorMessage()
        {
            var provider = IdentityTestFactory.BuildProvider();
            var userManager = provider.GetRequiredService<UserManager<AppUser>>();
            var roleamnager = provider.GetRequiredService<RoleManager<IdentityRole>>();
            var config = IdentityTestFactory.CreateTestConfig();
            var _sut = new UserService(userManager, config);



            await roleamnager.CreateAsync(new IdentityRole(Roles.Admin));
            await roleamnager.CreateAsync(new IdentityRole(Roles.User));

            var dto = new CreateUserDto
            {
                UserName = "adim2",
                Email = "Test2",
                Password = "test2",
                FirsName = "Tes2t",
                LastName = "Test2",
                IsAdmin = true
            };


            await _sut.AddAsync(dto);

            var logIndto = new LoginDto
            {
                UserNameOrEmail = "adiasdm2",
                Password = "test2",
            };


            var result = await _sut.LoginAsync(logIndto);

            result.IsSucces.Should().BeFalse();
            result.Error.Should().Be(ErrorMessages.UserNotFound);
            result.Data.Should().BeNull();


        }

        [Fact]
        public async Task LoginAsync_ShouldReturn_RolesFromToken()
        {
            var provider = IdentityTestFactory.BuildProvider();
            var userManager = provider.GetRequiredService<UserManager<AppUser>>();
            var roleamnager = provider.GetRequiredService<RoleManager<IdentityRole>>();
            var config = IdentityTestFactory.CreateTestConfig();
            var _sut = new UserService(userManager, config);



            await roleamnager.CreateAsync(new IdentityRole(Roles.Admin));
            await roleamnager.CreateAsync(new IdentityRole(Roles.User));

            var dto = new CreateUserDto
            {
                UserName = "adim2",
                Email = "Test2",
                Password = "test2",
                FirsName = "Tes2t",
                LastName = "Test2",
                IsAdmin = true
            };


            await _sut.AddAsync(dto);

            var logIndto = new LoginDto
            {
                UserNameOrEmail = "adim2",
                Password = "test2",
            };


            var result = await _sut.LoginAsync(logIndto);

            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(result.Data?.Token);

            jwt.Claims.Should().Contain(c => c.Type == ClaimTypes.Role && c.Value == Roles.Admin);
            jwt.Claims.Should().Contain(c => c.Type == ClaimTypes.Role && c.Value == Roles.User);



        }

        public class LoginDto
        {
            public string UserNameOrEmail { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;


        }

        public class CreateUserDto
        {
            public string? UserName { get; set; }
            public string? Email { get; set; }
            public string? Password { get; set; }
            public string? FirsName { get; set; }
            public string? LastName { get; set; }
            public bool IsAdmin { get; set; } = false;
        }

        public class CreateUserResponseDto
        {
            public string? Id { get; set; }
            public string? UserName { get; set; }
            public string? Email { get; set; }

            public IEnumerable<string>? Roles { get; set; }





        }
        public class TestIdentityDbContext : IdentityDbContext<AppUser>
        {
            public TestIdentityDbContext(DbContextOptions<TestIdentityDbContext> options) : base(options) { }
        }

        public static class IdentityTestFactory
        {
            public static ServiceProvider BuildProvider()
            {
                var services = new ServiceCollection();

                services.AddDbContext<TestIdentityDbContext>(opt =>
                    opt.UseInMemoryDatabase("TestDb_" + Guid.NewGuid()));

                services
                    .AddIdentityCore<AppUser>(options =>
                    {
                        options.Password.RequireDigit = false;
                        options.Password.RequireNonAlphanumeric = false;
                        options.Password.RequireUppercase = false;
                        options.Password.RequireLowercase = false;
                        options.Password.RequiredLength = 1;
                    })
                    .AddRoles<IdentityRole>()
                    .AddEntityFrameworkStores<TestIdentityDbContext>();

                // (valfritt men vanligt) om du använder tokens i något flöde
                services.AddLogging();

                var provider = services.BuildServiceProvider();

                return provider;
            }



            public static IConfiguration CreateTestConfig()
            {
                return new ConfigurationBuilder()
                    .AddInMemoryCollection(new Dictionary<string, string?>
                    {
                        ["JwtSettings:Key"] = "TEST_SECRET_KEY_32_CHARS_LONG_TEST",
                        ["JwtSettings:Issuer"] = "TestIssuer",
                        ["JwtSettings:Audience"] = "TestAudience",
                        ["JwtSettings:ExpiresHours"] = "1"
                    })
                    .Build();
            }
        }


        public interface IUserService
        {

            Task<Result<CreateUserResponseDto>> AddAsync(CreateUserDto dto);
            Task<Result<LoginResponseDto>> LoginAsync(LoginDto dto);

            Task<string> GenerateToken(AppUser user);

            Task<IEnumerable<string>> GetUserRoles(AppUser user);
        }

        public class LoginResponseDto
        {
            public string? Token { get; set; }
        }

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
}

