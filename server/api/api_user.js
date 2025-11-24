// api routes
const User = require("../models/user");
const router = require("express").Router();

router.post("/auth", (req, res) => {

    let user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        lastLoggedIn: Date.now(),
        dateCreated: req.body.dateCreated,  // birthDate: new Date(req.body.birthDate)
    });

    user.save().then(user => {
        res.status(201).json({message: `${user.fname} ${user.lname} account was saved`});
    }).catch(err => {
        res.status(400).json({error: err});
    });
});



// 


// router.get("/list", async (req, res) => {
//     const students = await (Student.find().sort({'gpa': 'desc'}));
//     let returnData = [];
//     students.forEach((stu) => {
//         let newStu = {student: stu.name, gpa: stu.gpa}
//         returnData.push(newStu);
//     })

//     if (returnData.length > 0) {
//         res.status(200).json(returnData);
//     }
//     else {
//         res.status(404).json({err: 'Students not found'});
//     }
// });


module.exports = router;

