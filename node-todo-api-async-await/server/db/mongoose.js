var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//"mongodb://duongdv:12345@ds119350.mlab.com:19350/todoapp"
module.exports = {
    mongoose
}

