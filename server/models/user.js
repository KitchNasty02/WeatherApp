
const db = require("../db");

// user model in mongo collection
const User = db.model("User", {
    fname: String,
    lname: String,
    email: String,
    password: String,
    lastLoggedIn: {type: Date, default: Date.now},
    dateCreated: {type: Date, default: Date.now}
})

module.exports = User;

