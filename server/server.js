const express = require("express");


const PORT = 3010;

const app = express();

const data = [
    {quote: 'balls.', author: "author1"},
    {quote: 'balls.', author: "author2"},
    {quote: 'balls.', author: "author3"},
    {quote: 'balls.', author: "author4"},
    {quote: 'balls.', author: "author5"},
]

app.get("/getQuote", (req, res) => {
    let qNum = parseInt(req.query.quote_num);
    let qt = data[qNum];
    res.json(qt);
})

app.listen(PORT, (err) => {
    if (err)
        console.log("server startup failed");
    else    
        console.log(`server listening on port ${PORT}`);
})

