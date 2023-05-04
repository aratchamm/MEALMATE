using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace main_backend.Models{
    public class NewUserModel{
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Phone { get; set; } = null!;
    }
}