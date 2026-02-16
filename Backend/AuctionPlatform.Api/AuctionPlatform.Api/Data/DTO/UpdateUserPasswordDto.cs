namespace AuctionPlatform.Api.Data.DTO
{
    public class UpdateUserPasswordDto
    {
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }

}
