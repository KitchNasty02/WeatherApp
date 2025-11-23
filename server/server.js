const express = require("express");
const Student = require("./models/student");
require("./db");

const PORT = 3010;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.post("/create", (req, res) => {
    let stu = new Student({
        name: req.body.name,
        gpa: req.body.gpa,
        birthDate: new Date(req.body.birthDate)
    });

    stu.save().then(stu => {
        res.send("Student was saved");
    }).catch(err => {
        res.status(400).send(err);
    });
});


app.get("/list", async (req, res) => {
    const students = await (Student.find().sort({'gpa': 'desc'}));
    let returnData = [];
    students.forEach((stu) => {
        let newStu = {student: stu.name, gpa: stu.gpa}
        returnData.push(newStu);
    })

    if (returnData.length > 0) {
        res.status(200).json(returnData);
    }
    else {
        res.status(404).json({err: 'Students not found'});
    }
});


app.listen(PORT, (err) => {
    if (err) {
        console.log(`Server failed on port ${PORT}`);
    }
    else {
        console.log(`Server started on port ${PORT}`);
    }
});


