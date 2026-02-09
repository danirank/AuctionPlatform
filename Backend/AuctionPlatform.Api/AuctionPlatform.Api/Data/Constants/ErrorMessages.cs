namespace AuctionPlatform.Api.Data.Constants
{
    public static class ErrorMessages
    {
        public const string AddEntityFailed = "Failed adding entity to db";
        public const string BidExistsOnPriceUpdate = "You cant update price when bid exists";
        public const string EntityWithIdNotFound = "The entity was not found";
        public const string FailSaveAsync = "Something went wrong when trying to save changes";
        public const string UserCredentialsMissing = "Invalid credentials entered for new user";
        public const string UserNotFound = "Invalid username or email";
        public const string WrongPassword = "Invalid Password";
        public const string FailedAddingRole = "Failed Adding Roles";
        public const string HigherBidExists = "Bid have to be higher than existing";
        public const string BidOnOwnAuction = "You cant bid on your own auction";
        public const string DeleteBidThatIsNotUsers = "Trying to delete someone else bid";
        public const string Unauthorized = "Unathorized";
        public const string UpdateElsesAuction = "The post is not yours";
        public const string BidLowerThanStrtSprice = "Bid was lower than startprice";
        public const string BidIsNotLatest = "Cannot delete if there is bid after";
        public const string AuctionIsClose = "Auction is closed";
    }
}
