using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace main_backend.Models{
    public class OrderModel{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null!;

        public string Owner { get; set; } = null!;

        public string PostId { get; set; } = null!;

        public string Foodname { get; set; } = null!;

        public string Note { get; set; } = null!;

        public decimal Count { get; set; }

        public string Status { get; set; } = null!;
        
    }
}