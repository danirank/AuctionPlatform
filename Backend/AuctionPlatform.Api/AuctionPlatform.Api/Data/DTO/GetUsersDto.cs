namespace AuctionPlatform.Api.Data.DTO
{
    public class GetUsersDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }

        public bool IsActive { get; set; }
    }
}