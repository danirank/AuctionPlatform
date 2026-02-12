using System.ComponentModel.DataAnnotations;

namespace AuctionPlatform.Api.Data.DTO
{
    public class UpdateAuctionDto
    {
        [StringLength(50, MinimumLength = 2)]
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public decimal? StartPrice { get; set; }
        public DateTime? newEndDateUtc { get; set; }
    }

    public class AdminDeactivateAuctionDto
    {
        public bool IsDeactivatedByAdmin { get; set; }
    }

    public class UpdateAuctionResponseDto
    {
        public string? Title { get; set; }
        public string? UserName { get; set; }
        public string? Description { get; set; }
        public bool IsOpen { get; set; }
        public decimal StartPrice { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsDeactivatedByAdmin { get; set; }


    }




}