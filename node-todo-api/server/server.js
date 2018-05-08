var express    = require("express");
var bodyParser = require("body-parser");
var {ObjectID} = require("mongodb");
var {mongoose} = require("./db/mongoose");
var {Todo}     = require("./models/todo");
var {User}     = require("./models/user");

var app = express();
const port = process.env.PORT

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

// GET /todos/12343143
app.get("/todos/:id", (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }, (e) => {
        console.log(e);
        res.status(404).send();
    })
})

app.listen(port, process.env.IP, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};