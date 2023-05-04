using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using main_backend.Models;
using main_backend.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace main_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller{

        private readonly UserService _userService;

        public UserController(UserService userService){
            _userService = userService;
        }

        [HttpGet]
        public async Task<List<UserModel>> Get(){
            return await _userService.GetAllUserAsync();
        }

        [Authorize]
        [HttpGet]
        [Route("GetUserById")]
        public async Task<UserModel> GetUserById(){
            string userId = Request.HttpContext.User.FindFirstValue("UserId");
            var user = await _userService.GetUserByIdAsync(userId);
            user.Password = "";
            return user;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(NewUserModel newUser){
            try{
                await _userService.CreateUserAsync(newUser);
                return Ok();  
            }
            catch{
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel loginUser){
            var user = await _userService.LoginAsync(loginUser);
            if(user==null){
                return NotFound();
            }
            else{
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("UserId", user.Id.ToString()),
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("JWT_KEY_SECURE_123"));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    "test",
                    "test",
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(3600),
                    signingCredentials: signIn);

                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
        }
    }
}