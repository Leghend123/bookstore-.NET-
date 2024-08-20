using Microsoft.AspNetCore.Mvc;
using innorik.Interfaces;
using innorik.Models;

namespace innorik.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;

        public TokenController(ITokenService tokenService, IUserService userService)
        {
            _tokenService = tokenService;
            _userService = userService;
        }

        [HttpPost("generate")]
        public IActionResult GenerateToken([FromBody] User user)
        {
            var token = _tokenService.GenerateJwtToken( user.Username);
            return Ok(new { Token = token });
        }

         
    [HttpPost("validate")]
    public IActionResult ValidateToken([FromBody] TokenRequestDto request)
    {
        if (string.IsNullOrEmpty(request.Token) || !_tokenService.ValidateToken(request.Token))
        {
            return Unauthorized(new { Message = false });
        }
        var username = _tokenService.GetUsernameFromToken(request.Token);
        return Ok(new { Message = true });
    }
    }
}
