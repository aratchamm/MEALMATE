namespace main_backend.Models{
    public class MongoDBSettings{
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string UsersCollectionName {get; set; } = null!;
        public string PostsCollectionName { get; set; } = null!;
        public string OrdersCollectionName { get; set; } = null!;
    }
}

