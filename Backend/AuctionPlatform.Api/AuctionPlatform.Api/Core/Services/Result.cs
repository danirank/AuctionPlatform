namespace AuctionPlatform.Api.Core.Services
{
    public class Result<T>
    {
        public bool IsSucces { get; private set; }

        public string? Error { get; private set; }
        public T? Data { get; private set; }

        private Result() { }

        public static Result<T> Ok(T data)
        {
            return new Result<T>
            {
                IsSucces = true,
                Data = data
            };
        }


        public static Result<T> Fail(string error)
        {
            return new Result<T>
            {
                IsSucces = false,
                Error = error
            };
        }
    }
}
