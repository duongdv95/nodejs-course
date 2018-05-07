var express    = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose");
var {Todo}     = require("./models/todo");
var {User}     = require("./models/user");

var app = express();

app.use(bodyParser.json());

// Todo.create({
//     text: "Walk the dog"
// }, (err, todo) => {
//     if(err) {
//         console.log(err);
//     }
// })

app.get("/", (req, res) => {
    res.send("Merp");
});

app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e);
    })
});

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server Connected");
});

module.exports = {app};