using AuctionPlatform.Api.Core.Interfaces;
using AuctionPlatform.Api.Data.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AuctionPlatform.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly IBidService _bidService;

        public BidController(IBidService bidService)
        {
            _bidService = bidService;
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> AddBid(AddBidDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
                return Unauthorized();

            var result = await _bidService.AddBidAsync(dto, userId);

            return result.IsSucces ? Ok(result.Data) : BadRequest(result.Error);

        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteBid(DeleteBidDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
                return Unauthorized();

            var result = await _bidService.DeleteAsync(dto, userId);

            return result.IsSucces ? Ok(result.Data?.Message) : BadRequest(result.Error);

        }

        [HttpGet]
        public async Task<IActionResult> GetBidsByAuction(int auctionId)
        {
            var result = await _bidService.GetBidsForAuction(auctionId);
            return Ok(result.Data);
        }

    }
}
