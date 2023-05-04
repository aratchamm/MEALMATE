using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Security.Cryptography;
using System.Text;
using main_backend.Models;

namespace main_backend.Services{

    public class PostService {
        private readonly IMongoCollection<PostModel> _postCollection;

        public PostService(IOptions<MongoDBSettings> mongoDBSettings){
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionString);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _postCollection = database.GetCollection<PostModel>(mongoDBSettings.Value.PostsCollectionName);
        }
        
        public async Task<List<PostModel>> ListAllPostsAsync(string owner)=>
            await _postCollection.Find(x => x.Owner != owner && x.Status == "unfinish").ToListAsync();

        public async Task<PostModel> GetPostByUserIdAsync(string userId) =>
            await _postCollection.Find(x => x.Owner == userId && x.Status != "finish").FirstOrDefaultAsync();

        public async Task<PostModel> GetPostByIdAsync(string id) =>
        await _postCollection.Find(x => x.Id == id && x.Status != "finish").FirstOrDefaultAsync();

        public async Task CreatePostAsync(string userId,NewPostModel newPost){
            Random rnd = new Random();
            int index  = rnd.Next(0, 18);
            var post = new PostModel{
                Owner = userId,
                OwnerUserName = "username",
                Limit = newPost.Limit,
                Hour = newPost.Hour,
                Minute = newPost.Minute,
                Status = "unfinish",
                ImgIndex = index,
                ImgOrderIndexList = new List<int>{}
            };
            await _postCollection.InsertOneAsync(post);
        }

        public async Task UpdatePostAsync(string id,PostModel post)=>
            await _postCollection.ReplaceOneAsync(x=>x.Id == id,post);
         
    }
}