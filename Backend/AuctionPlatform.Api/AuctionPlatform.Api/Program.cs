
using BlogPostApi.Extensions;

namespace AuctionPlatform.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Srvices via extension metoder som finns i Extensions/ServiceExtensions
            builder.Services.AddDbContextExtension(builder);

            builder.Services.AddJwtAuth(builder);

            builder.Services.AddScopedServices();

            builder.Services.AddAutoMapper(typeof(Program));

            builder.Services.AddIdentity();

            builder.Services.AddControllers();

            builder.Services.AddSwaggerServices();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {

                app.UseSwagger();
                app.UseSwaggerUI();

            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
