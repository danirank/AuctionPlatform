using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace AuctionPlatform.Api.Data.Entities
{
    public class Auction
    {
        [Key]
        public int AuctionId { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Precision(18, 2)]
        [Range(0.01, double.MaxValue)]
        public decimal StartPrice { get; set; }

        public string? ImageUrl { get; set; }

        public DateTime StartAtUtc { get; set; }

        [Required]
        public DateTime EndAtUtc { get; set; }

        public bool IsOpen => DateTime.UtcNow < EndAtUtc;

        public string UserId { get; set; } = string.Empty;
        public AppUser? User { get; set; }

        public List<Bid> Bids { get; set; } = new();
    }
}
