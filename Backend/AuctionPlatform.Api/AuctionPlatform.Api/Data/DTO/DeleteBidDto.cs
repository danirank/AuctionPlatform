namespace AuctionPlatform.Api.Data.DTO
{
    public class DeleteBidResponseDto
    {
        public string Message { get; set; } = string.Empty;
    }

    public class DeleteBidDto
    {

        public int BidId { get; set; }
        public int AuctionId { get; set; }

    }
}
