using System.ComponentModel.DataAnnotations;

namespace AuctionPlatform.Api.Data.DTO
{
    public class CreateAuctionResponeDto
    {
        public int AuctionId { get; set; }

        public string? UserId { get; set; }

        public bool IsOpen { get; set; }
    }

    public class CreateAuctionDto
    {
        [StringLength(50, MinimumLength = 2)]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public DateTime StartAtUtc { get; set; } = DateTime.Now;

        public DateTime EndAtUtc { get; set; } = DateTime.Now.AddDays(7);



    }
}
