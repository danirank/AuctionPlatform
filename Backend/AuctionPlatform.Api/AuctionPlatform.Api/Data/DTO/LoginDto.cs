namespace AuctionPlatform.Api.Data.DTO
{
    public class LoginDto
    {
        public string UserNameOrEmail { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;


    }
    public class LoginResponseDto
    {
        public string? Token { get; set; }
    }


}
