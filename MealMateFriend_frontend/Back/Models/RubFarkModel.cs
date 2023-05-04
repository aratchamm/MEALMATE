using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace main_backend.Models{
    public class RubFarkModel{

        public string OrderId { get; set; } = null!;
        public string OrderStatus { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string FoodName { get; set; } = null!;
        public string Note { get; set; } = null!;
    }
}