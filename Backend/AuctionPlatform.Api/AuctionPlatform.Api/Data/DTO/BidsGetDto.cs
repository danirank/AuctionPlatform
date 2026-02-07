namespace AuctionPlatform.Api.Data.DTO
{
    public class BidsGetDto
    {
        public decimal BidAmount { get; set; }
        public string? UserName { get; set; }

        public DateTime BidDateTime { get; set; }
    }
}
