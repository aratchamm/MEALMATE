using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Security.Cryptography;
using System.Text;
using main_backend.Models;

namespace main_backend.Services{
    public class UserService {

        private readonly IMongoCollection<UserModel> _userCollection;

        public UserService(IOptions<MongoDBSettings> mongoDBSettings){
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionString);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _userCollection = database.GetCollection<UserModel>(mongoDBSettings.Value.UsersCollectionName);
        }

        public async Task<List<UserModel>> GetAllUserAsync()=>
            await _userCollection.Find(_ => true).ToListAsync();

        public async Task CreateUserAsync(NewUserModel newUser){
            var _user = await _userCollection.Find(x => x.Username == newUser.Username).FirstOrDefaultAsync();
            Random rnd = new Random();
            int index  = rnd.Next(0, 8);
            if(_user == null){
                var hashPassword = string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(newUser.Password)).Select(s => s.ToString("x2")));
                var user = new UserModel{
                    Username = newUser.Username,
                    Password = hashPassword,
                    Phone = newUser.Phone,
                    ProfileImgIndex = index
                };
                await _userCollection.InsertOneAsync(user);
            }
            else{
                throw new NotImplementedException();
            }
        }

        public async Task<UserModel> LoginAsync(LoginModel login){
            var hashPassword = string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(login.Password)).Select(s=>s.ToString("x2")));
            return await _userCollection.Find(x => x.Username == login.Username && x.Password == hashPassword).FirstOrDefaultAsync();
        }

        public async Task<UserModel> GetUserByIdAsync(string id)=>
            await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }
}

