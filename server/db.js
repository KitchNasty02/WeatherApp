const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/users");
module.exports = mongoose;


// start mongodb
// mongod -dbpath userData