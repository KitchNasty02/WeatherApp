// tells how user data should look

const db = require("../db");

const User = db.model("User", {
    fname: String,
    lname: String,
    email: String,
    password: String,
    lastLoggedIn: {type: Date, default: Date.now},
    dateCreated: {type: Date, default: Date.now}
})

module.exports = User;

