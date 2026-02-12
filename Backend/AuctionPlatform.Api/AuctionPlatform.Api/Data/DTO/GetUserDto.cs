namespace AuctionPlatform.Api.Data.DTO
{
    public class GetUserDto
    {
        public string? UserId { get; set; }


        public bool IsActive { get; set; }

    }

    public class GetUserValidationDto
    {
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public IEnumerable<string> Roles { get; set; } = new List<string>();
    }
}