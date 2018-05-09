const {ObjectID} = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// deletes all documents, we do not get docs back
// Todo.remove({}).then((result) => {
//     console.log(result);
// })

// removes document but also returns document
// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: "5af2aa4a3ccdd010a495c1ac"}).then((todo) => {
//     console.log(todo);
// });

// Todo.findByIdAndRemove("5af2aa4a3ccdd010a495c1ad").then((todo) => {
//     console.log(todo);
// })

// for(var i = 0; i < 10; i++) {
//     Todo.create({
//         text: `Walk the dog ${i}`
//     }, (err, todo) => {
//         if(err) {
//             console.log(err);
//         }
//     })
// }
