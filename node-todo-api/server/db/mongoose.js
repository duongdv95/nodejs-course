var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://duongdv:12345@ds119350.mlab.com:19350/todoapp" || "mongodb://localhost:27017/TodoApp");

module.exports = {
    mongoose
}