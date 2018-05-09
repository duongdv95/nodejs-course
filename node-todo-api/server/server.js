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
        return res.status(404).send("404");
    }
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send("404");
        }
        res.send({todo});
    }, (e) => {
        console.log(e);
        res.status(404).send("404");
    })
})

app.delete("/todos/:id", (req, res) => {
    // get the id
    var id = req.params.id;

    // validate the ide => not valid? return 404
    if(!ObjectID.isValid(id)) {
        return res.status(404).send("404");
    }
    
    // remove todo by id
    Todo.findByIdAndRemove(id).then((doc) => {
        if(!doc) {
            return res.status(404).send("404");
        }
        res.status(200).send(JSON.stringify(doc, undefined, 2));
    }, (e) => {
        res.status(400).send("404");
    })
        // success
            // if no doc, send 404
            // if doc, send doc with 200
        // error
            //400 with empty body
})

app.listen(port, process.env.IP, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};