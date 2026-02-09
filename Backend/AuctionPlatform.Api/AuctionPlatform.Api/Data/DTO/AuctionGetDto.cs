using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace AuctionPlatform.Api.Data.DTO
{
    public class AuctionsGetResponseDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }

        [Precision(18, 2)]
        [Range(0.01, double.MaxValue)]
        public decimal StartPrice { get; set; }

        public BidsGetDto? HighestBid { get; set; }

        public string? ImageUrl { get; set; }

        public bool IsOpen { get; set; }

        public DateTime StartDateUtc { get; set; }
        public DateTime EndDateUtc { get; set; }

        public bool IsDeactivatedByAdmin { get; set; }




    }
}
