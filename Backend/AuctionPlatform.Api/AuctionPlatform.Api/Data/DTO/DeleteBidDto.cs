namespace AuctionPlatform.Api.Data.DTO
{
    public class DeleteBidResponseDto
    {
        public string Message { get; set; } = string.Empty;
    }
    public class DeleteBidDto
    {
        public string UserId { get; set; }
        public int BidId { get; set; }
    }
}
