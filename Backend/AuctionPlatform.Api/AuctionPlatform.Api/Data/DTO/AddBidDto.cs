namespace AuctionPlatform.Api.Data.DTO
{
    public class AddBidDto
    {
        public int AuctionId { get; set; }
        public int Amount { get; set; }
        public string? UserId { get; set; }

    }
    public class AddBidResponseDto
    {
        public int AuctionId { get; set; }
        public int BidId { get; set; }
        public string UserId { get; set; }
    }
}
