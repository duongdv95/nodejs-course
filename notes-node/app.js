console.log("Starting app..");

const fs = require("fs");
const os = require("os");
const _ = require("lodash");
const notes = require("./notes.js");

// console.log(_.isString(true));
// console.log(_.isString("Andrew"));
var filteredArray = _.uniq(["Bob", 1, "Daniel", 1])
console.log(filteredArray);
// console.log(notes.add(5,6));
// var user = os.userInfo();

// fs.appendFile("greetings.txt", `Hellur ${user.username}! You are ${notes.age}`);