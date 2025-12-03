const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/userDB");
module.exports = mongoose;


// start mongodb
// mongod -dbpath ../userData