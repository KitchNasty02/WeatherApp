// api routes
const User = require("../models/user");
const router = require("express").Router();
const fetch = require("node-fetch");

const WEATHER_API_KEY = "4e579bb25abb6eab140b31f6c7b42f1d";
const WEATHER_API_UNITS = "imperial";

// creates new user on POST request
router.post("/auth", (req, res) => {

    let user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        lastLoggedIn: req.body.lastLoggedIn, // Date.now(),
        dateCreated: req.body.dateCreated,  // birthDate: new Date(req.body.birthDate)
    });

    user.save().then(user => {
        res.status(201).json({message: `${user.fname} ${user.lname} account was saved`});
    }).catch(err => {
        res.status(401).json({error: err});
    });
});


// returns current weather for specific zip code
router.get("/curweather", async (req, res) => {
    const zip = req.query.zip;
    // could send units with get or keep in user and change based off that
    const params = new URLSearchParams({
        zip: zip,
        units: WEATHER_API_UNITS,
        appid: WEATHER_API_KEY
    });

    fetch("http://api.openweathermap.org/data/2.5/weather?" + params)
        .then(response => response.json())
        .then(data => {
            const localWeather = {
                data: data,
                zip: zip
            };

            res.status(200).json(localWeather);
        })
        .catch(err => {
            res.status(400).json({error: err});
        });

});


module.exports = router;

