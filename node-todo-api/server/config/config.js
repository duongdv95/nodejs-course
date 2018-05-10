var env = process.env.NODE_ENV || "development";

if(env === "development") {
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp"
} else if (env === "test") {
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest"
} else if (env === "production") {
    process.env.MONGODB_URI = "mongodb://duongdv:12345@ds119350.mlab.com:19350/todoapp"
}