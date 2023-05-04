using System.Text.Json.Serialization;

namespace main_backend.Models{
    public class NewOrderModel{
        public string PostId { get; set; } = null!;

        public string Foodname { get; set; } = null!;

        public string Note { get; set; } = null!;

        public decimal Count { get; set; }
    }
}