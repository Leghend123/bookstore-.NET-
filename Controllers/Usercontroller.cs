using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using innorik.Interfaces;
using innorik.Models;
using Microsoft.AspNetCore.Cors;

namespace innorik.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public UsersController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        // [HttpOptions("login")]
        // public IActionResult LoginOptions()
        // {
        //     return Ok();
        // }

        // [HttpOptions("register")]
        // public IActionResult RegisterOptions()
        // {
        //     return Ok();
        // }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userService.Login(loginDto);
            if (user == null)
            {
                return Unauthorized();
            }

            var token = _tokenService.GenerateJwtToken(user.Username);
            return Ok(new { Token = token, Login=true });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var user = new User
            {
                Username = registerDto.Username,
            };

            await _userService.RegisterUser(user, registerDto.Password);
            return Ok(new { Message = "User registered successfully." });
        }
    }
}
