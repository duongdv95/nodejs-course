// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");
    
    // deleteMany
    // db.collection("Todos").deleteMany({text: "Merp"}).then((result) => {
    //     console.log(result);
    // });
    // deleteOne
    // db.collection("Todos").deleteOne({text: "Something to do1"}).then((result) => {
    //     console.log(result);
    // })
    
    // findOneAndDelete
    // db.collection("Todos").findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });
    
    // Test - remove duplicate and remove 1 user by ID
    // db.collection("Users").deleteMany({name: "Bob"}).then((result) => {
    //     console.log(result);
    // })
    
    // db.collection("Users").findOneAndDelete({_id: new ObjectID("5aef908638ae1b0f5b0d2d4e")}).then((result) => {
    //     console.log(result);
    // })
    // client.close();
});