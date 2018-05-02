const express = require("express");
const hbs     = require("hbs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "hbs");

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
})

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
})
app.get("/", (req, res) => {
    res.render("home", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my website!"
    })
})

app.get("/about", (req,res) => {
    res.render("about", {
        pageTitle: "About Page"
    });
});

app.get("/bad", (req,res) => {
    res.send({
        errorMessage: "Unable to handle request"
    });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server connected");
})