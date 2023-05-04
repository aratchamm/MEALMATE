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
    public class OrderController : Controller{
        private readonly OrderService _orderService;
        private readonly PostService _postService;
        private readonly UserService _userService;

        public OrderController(OrderService orderService,PostService postService,UserService userService){
            _orderService = orderService;
            _postService = postService;
            _userService = userService;
        }

        [Authorize]
        [HttpGet]
        [Route("ListOrderByUserId")]
        public async Task<List<FarkSueModel>> ListOrderByUserId(){
            string userId = Request.HttpContext.User.FindFirstValue("UserId");
            var orders = await _orderService.ListOrdersByUserId(userId);
            var farkSue = new List<FarkSueModel>();
            if(orders==null){
                return farkSue;
            }
            foreach (var order in orders){
                var post = await _postService.GetPostByIdAsync(order.PostId);
                var user = await _userService.GetUserByIdAsync(post.Owner);
                farkSue.Add(new FarkSueModel{
                    OrderId = order.Id,
                    OrderStatus = order.Status,
                    Username = user.Username,
                    Phone = user.Phone,
                    FoodName = order.Foodname,
                    Note = order.Note
                });
            }
            farkSue.Reverse();
            return farkSue;
        }

        [Authorize]
        [HttpGet]
        [Route("GetOrdersByMyPost")]
        public async Task<List<RubFarkModel>> GetOrdersByMyPost(){
            string userId = Request.HttpContext.User.FindFirstValue("UserId");
            var post = await _postService.GetPostByUserIdAsync(userId);
            if(post==null){
                var nullFark =  new List<RubFarkModel>();
                return nullFark;
            }
            var orders = await _orderService.ListOrdersByPostId(post.Id);
            var rubFark = new List<RubFarkModel>();
            foreach(var order in orders){
                var user = await _userService.GetUserByIdAsync(order.Owner);
                rubFark.Add(new RubFarkModel { 
                    OrderId = order.Id,
                    OrderStatus = order.Status,
                    Username = user.Username,
                    Phone = user.Phone,
                    FoodName = order.Foodname,
                    Note = order.Note
                });
            };
            rubFark.Reverse(); 
            return rubFark;
        }

        [Authorize]
        [HttpPost]
        [Route("CreateOrder")]
        public async Task<IActionResult> CreateOrder(NewOrderModel newOrder){
            try{
                string userId = Request.HttpContext.User.FindFirstValue("UserId");
                await _orderService.CreateOrderAsync(newOrder,userId);
                return Ok();
            }
            catch{
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPost]
        [Route("AcceptOrder")]
        public async Task<IActionResult> AcceptOrder(string orderId){
            string userId = Request.HttpContext.User.FindFirstValue("UserId");
            var order = await _orderService.GetOrderByIdAsync(orderId);
            if (order == null){return NotFound();}
            order.Status = "accept";
            await _orderService.UpdateOrderAsync(order);
            var post = await _postService.GetPostByIdAsync(order.PostId);
            var user = await _userService.GetUserByIdAsync(userId);
            post.ImgOrderIndexList.Add(user.ProfileImgIndex);
            await _postService.UpdatePostAsync(post.Id,post);
            return Ok();
        }

        [Authorize]
        [HttpPost]
        [Route("RejectOrder")]
        public async Task<IActionResult> RejectOrder(string orderId){
            var order = await _orderService.GetOrderByIdAsync(orderId);
            if (order == null){return NotFound();}
            order.Status = "reject";
            await _orderService.UpdateOrderAsync(order);
            return Ok();
        }

        [Authorize]
        [HttpPost]
        [Route("CompleteOrder")]
        public async Task<IActionResult> CompleteOrder(string orderId){
            var order = await _orderService.GetOrderByIdAsync(orderId);
            if (order == null){return NotFound();}
            order.Status = "complete";
            await _orderService.UpdateOrderAsync(order);
            var orders = await _orderService.ListAcceptOrderByPostIdAsync(order.PostId);
            if(orders.Count ==0){
                var post = await _postService.GetPostByIdAsync(order.PostId);
                post.Status = "finish";
                await _postService.UpdatePostAsync(post.Id,post);
            }
            return Ok();
        }
    }
}