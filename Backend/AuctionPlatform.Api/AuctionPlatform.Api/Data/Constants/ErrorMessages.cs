namespace AuctionPlatform.Api.Data.Constants
{
    public static class ErrorMessages
    {
        public const string AddEntityFailed = "Failed adding entity to db";
        public const string BidExistsOnPriceUpdate = "You cant update price when bid exists";
        public const string EntityWithIdNotFound = "The entity was not found";
        public const string FailSaveAsync = "Something went wrong when trying to save changes";
        public const string UserCredentialsMissing = "Invalid credentials entered for new user";
        public const string UserNotFound = "Ivalid username or email";
        public const string WrongPassword = "Invalid Password";
        public const string FailedAddingRole = "Failed Adding Roles";
    }
}
