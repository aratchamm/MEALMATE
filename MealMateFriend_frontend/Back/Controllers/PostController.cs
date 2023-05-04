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
    public class PostController : Controller{
        private readonly PostService _postService;
        private readonly UserService _userService;
        private readonly OrderService _orderService;

        public PostController(PostService postService,UserService userService,OrderService orderService){
            _postService = postService;
            _userService = userService;
            _orderService = orderService;
        }

        [Authorize]
        [HttpGet]
        [Route("ListAllPosts")]
        public async Task<List<PostModel>> ListAllPosts(){
            string userId = Request.HttpContext.User.FindFirstValue("UserId");
            var posts = await _postService.ListAllPostsAsync(userId);
            if(posts==null){
                var nullList = new List<PostModel>();
                return nullList;
            }
            foreach (var post in posts){
                var owner = await _userService.GetUserByIdAsync(post.Owner);
                post.OwnerUserName = owner.Username;
                var orders = await _orderService.ListAcceptOrderByPostIdAsync(post.Id);
                var counter = 0;
                foreach (var order in orders)
                {
                    counter += Convert.ToInt32(order.Count); 
                }
                post.Count = counter;
            }
            return posts;
        }

        [Authorize]
        [HttpGet]
        [Route("GetMyPost")]
        public async Task<PostModel> GetMyPost(){
            string userId = Request.HttpContext.User.FindFirstValue("UserId");
            return await _postService.GetPostByUserIdAsync(userId);
        }

        [Authorize]
        [HttpPost]
        [Route("FinishPost")]
        public async Task<IActionResult> FinishPost(string postId){
            var post = await _postService.GetPostByIdAsync(postId);
            post.Status = "finish";
            await _postService.UpdatePostAsync(postId,post);
            return Ok();
        }

        [Authorize]
        [HttpPost]
        [Route("CreatePost")]
        public async Task<IActionResult> CreatePost(NewPostModel newPost){
            try{
                string userId = Request.HttpContext.User.FindFirstValue("UserId");
                await _postService.CreatePostAsync(userId,newPost);
                return Ok();
            }
            catch{
                return BadRequest();
            }
            
        }

        [Authorize]
        [HttpPost]
        [Route("ClosePost")]
        public async Task<IActionResult> ClosePost(string postId){
            var post = await _postService.GetPostByIdAsync(postId);
            if(post==null){return NotFound();}
            post.Status="close";
            var orders = await _orderService.ListWaitingOrderByPostIdAsync(postId);
            foreach(var order in orders){
                order.Status = "reject";
                await _orderService.UpdateOrderAsync(order);
            }
            await _postService.UpdatePostAsync(postId,post);
            return Ok();
        }

    } 
}