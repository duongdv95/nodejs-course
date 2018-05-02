const express = require("express");

var app = express();

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
    res.send({
        name: "Daniel",
        likes: [
            "Fishing",
            "Hiking",
            "Camping"
        ]
    });
})

app.get("/about", (req,res) => {
    res.send("About Page");
});

app.get("/bad", (req,res) => {
    res.send({
        errorMessage: "Unable to handle request"
    });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server connected");
})