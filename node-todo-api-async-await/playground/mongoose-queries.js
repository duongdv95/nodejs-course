const {ObjectID} = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// invalid ID if there are more digits than normal
// i.e. if user specifies the ID

// var id = "5af13f5c43b5f911ceda6bd211"

// if(!ObjectID.isValid(id)) {
//     console.log("ID not valid");
// }
// Mongoose can convert the id string to object ID
// whereas you have to convert to object ID manually in mongodb


// Returns a list of an object
// Will return empty [] if empty
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log("Todos", todos);
// });

// Returns an object, can be useful if you find nothing
// you get a null back and do something about it
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log("Todo", todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log("Id not found");
//     }
//     console.log("Todo by Id", todo);
// }).catch((e) => console.log(e));

// User.findById(Id) 3 cases: no user, user found, handle error

// Promises - then(fulfilled, rejected)
var Id = "5aefc23ac1a9601c1740adde"
User.findById(Id).then((user) => {
    if(!user){
        return console.log("Unable to find user");
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e);
});