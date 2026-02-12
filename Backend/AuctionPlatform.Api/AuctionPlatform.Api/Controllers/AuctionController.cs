using AuctionPlatform.Api.Core.Interfaces;
using AuctionPlatform.Api.Data.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AuctionPlatform.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionService _auctionService;

        public AuctionController(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }

        #region Get

        [HttpGet("/auctions/{auctionId}")]
        public async Task<IActionResult> GetById(int auctionId)
        {
            var result = await _auctionService.GetById(auctionId);

            return Ok(result.Data);
        }



        [Route("/open/search")]
        [HttpGet]
        public async Task<IActionResult> SearchOpenAuctions(string search)
        {
            var result = await _auctionService.GetAllOpenAsync(search);

            return Ok(result.Data);
        }

        [Route("/open/all")]
        [HttpGet]
        public async Task<IActionResult> GetAllOpenAuctions()
        {
            var result = await _auctionService.GetAllOpenAsync();

            return Ok(result.Data);
        }

        [Route("/all/search")]
        [HttpGet]
        public async Task<IActionResult> SearchAllAuctions(string search)
        {
            var result = await _auctionService.GetAllAsync(search);

            return Ok(result.Data);
        }

        [Route("/all")]

        [HttpGet]
        public async Task<IActionResult> AllAuctions()
        {
            var result = await _auctionService.GetAllAsync();

            return Ok(result.Data);
        }
        #endregion

        #region Post

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePost(CreateAuctionDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
                return Unauthorized();

            var result = await _auctionService.AddAsync(dto, userId);


            return result.IsSucces ? Ok(result.Data) : BadRequest(result.Error);
        }

        #endregion

        #region Put
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateAuction(int auctionId, UpdateAuctionDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
                return Unauthorized();

            var result = await _auctionService.UpdateAsync(dto, auctionId, userId);

            return result.IsSucces ? Ok(result.Data) : BadRequest(result.Error);


        }

        [Route("/deactivate")]
        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeActivateAuction(AdminDeactivateAuctionDto dto, int auctionId)
        {
            var result = await _auctionService.DeActivateAuction(dto, auctionId);

            return result.IsSucces ? Ok(result.Data) : BadRequest(result.Error);
        }
        #endregion


    }
}
