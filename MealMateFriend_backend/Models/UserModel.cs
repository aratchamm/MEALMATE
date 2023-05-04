using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace main_backend.Models{
    public class UserModel{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public int ProfileImgIndex { get; set; } = 0;
    }
}