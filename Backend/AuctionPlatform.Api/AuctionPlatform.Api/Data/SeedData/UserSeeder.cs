using AuctionPlatform.Api.Data.Constants;
using AuctionPlatform.Api.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace AuctionPlatform.Api.Data.SeedData
{
    public static class UserSeeder
    {
        public static async Task SeedUsersAsync(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();

            await CreateUserWithRole(userManager, "Daniel", "Andersson", "admin", "admin@auction.com", "admin1", Roles.Admin);
            await CreateUserWithRole(userManager, "Pontus", "Karlsson", "Ponta", "pontus@auction.com", "auctionUser", Roles.User);
            await CreateUserWithRole(userManager, "Peter", "Svensson", "PMan", "peterB@auction.com", "auctionUser", Roles.User);
            await CreateUserWithRole(userManager, "Maria", "Nilsson", "Marre", "maria@auction.com", "auctionUser", Roles.User);
            await CreateUserWithRole(userManager, "Olof", "Nilsson", "Olle", "olof@auction.com", "auctionUser", Roles.User);


        }

        private static async Task CreateUserWithRole(UserManager<AppUser> userManager,
            string firstName,
            string lastName,
            string userName,
            string email,
            string password,
            string role)
        {
            if (await userManager.FindByEmailAsync(email) == null)
            {
                var newUser = new AppUser
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    EmailConfirmed = true,
                    UserName = userName

                };

                var result = await userManager.CreateAsync(newUser, password);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(newUser, role);
                }
                else
                {




                    var errors = string.Join(", ", result.Errors.Select(e => $"{e.Code}: {e.Description}"));
                    throw new Exception($"Failed creating user with Email: {email}. Errors: {errors}");


                }
            }
        }
    }
}
