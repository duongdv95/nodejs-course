const express = require("express");

var app = express();

app.get("/", (req, res) => {
    res.status(404).send({
        error: "Page not found.",
        name: "Todo App v1.0"
    });
})

app.get("/users", (req, res) => {
    var users = [];
    users.push({
        firstName: "Daniel",
        age: 23
    }, {
        firstName: "Bob",
        age: 30
    })
    res.send(users);
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server connected!");
})

module.exports.app = app;