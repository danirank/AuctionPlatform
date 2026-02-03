using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AuctionPlatform.Api.Data.Entities
{
    public class AppUser : IdentityUser
    {

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        public bool IsActiveUser { get; set; } = true;

        public List<Bid> Bids { get; set; } = new();

        public List<Auction> Auctions { get; set; } = new();


    }
}
