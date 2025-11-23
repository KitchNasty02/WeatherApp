// tells how student data should look

const db = require("../db");

const Student = db.model("Student", {
    name: String,
    gpa: {type:Number, min: 0, max: 4},
    birthDate: {type: Date, default: Date.now}
})

module.exports = Student;

