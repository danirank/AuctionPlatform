using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace AuctionPlatform.Api.Data.Entities
{
    public class Bid
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime BidTimeUtc { get; set; } = DateTime.UtcNow;

        [Required]
        [Precision(18, 2)]
        [Range(0.01, double.MaxValue)]
        public decimal BidAmount { get; set; }

        public string UserId { get; set; } = string.Empty;

        public AppUser? User { get; set; }

        public int AuctionId { get; set; }

        public Auction? Auction { get; set; }

    }
}