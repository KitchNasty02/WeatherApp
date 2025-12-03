// import cors from 'cors';

const express = require("express");
const cors = require("cors");
require("./db");

const PORT = 3010;
const app = express();

app.use(cors()); // allow all origins

app.use(express.static("../client"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api", require("./api/users"));



app.listen(PORT, (err) => {
    if (err) {
        console.log(`Server failed on port ${PORT}`);
    }
    else {
        console.log(`Server started on port ${PORT}`);
    }
});


