namespace AuctionPlatform.Api.Data.DTO
{
    public class AuctionsGetResponseDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public bool IsOpen { get; set; }

        public DateTime StartDateUtc { get; set; }
        public DateTime EndDateUtc { get; set; }



    }
}
