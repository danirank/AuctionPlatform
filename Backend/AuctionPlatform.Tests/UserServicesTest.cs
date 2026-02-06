using AuctionPlatform.Api.Core.Services;
using AuctionPlatform.Api.Data.Constants;
using AuctionPlatform.Api.Data.DTO;
using AuctionPlatform.Api.Data.Entities;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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





    }
}

