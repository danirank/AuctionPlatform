using AuctionPlatform.Api.Core.Interfaces;
using AuctionPlatform.Api.Data.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AuctionPlatform.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterUserDto dto)
        {
            var result = await _userService.AddAsync(dto);

            return result.IsSucces ? Ok(result.Data) : BadRequest(result);

        }

        [HttpPost]
        [Route("/login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var result = await _userService.LoginAsync(dto);

            return result.IsSucces ? Ok(result.Data) : BadRequest(result);

        }

        [Authorize(Roles = "Admin")]
        [Route("/allUsers/search")]
        [HttpGet]
        public async Task<IActionResult> GetUsers(string search)
        {
            var result = await _userService.GetAll(search);

            return Ok(result.Data);
        }

        [Authorize]
        [HttpGet("/user/{userId}")]

        public async Task<IActionResult> GetUserValidation(string userId)
        {
            //User should only get their own credentiels - using for validation in UI 

            var userIdfromToken = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdfromToken is null || userId != userIdfromToken)
                return Unauthorized();

            var result = await _userService.GetUserByIdDto(userId);

            return Ok(result.Data);

        }

        [Authorize(Roles = "Admin")]
        [Route("/allUsers")]

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var result = await _userService.GetAll();

            return Ok(result.Data);
        }


        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeActivateUser(UpdateStatusUserDto dto, string userId)
        {
            var result = await _userService.DeActivateUser(dto, userId);

            return result.IsSucces ? Ok(result.Data) : BadRequest(result.Error);
        }



    }
}
