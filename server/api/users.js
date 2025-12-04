// api routes
const User = require("../models/user");
const router = require("express").Router();
const fetch = require("node-fetch");
require("dotenv").config();

const WEATHER_API_KEY = process.env.API_KEY;
const WEATHER_API_UNITS = "imperial";

// creates new user on POST request
router.post("/auth/signup", async (req, res) => {
    const { fname, lname, email, password } = req.body;

    const user = await User.findOne({email: email});
    
    if (user) {
        res.status(401).json({message: "An account has already been created with this email"});
    }

    // else make a new account
    let newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        lastLoggedIn: Date.now(),
        dateCreated: Date.now(),
    });

    // newUser.save().then(user => {
    //     res.status(201).json({message: `${newUser.fname} ${newUser.lname} account was saved`});
    // }).catch(err => {
    //     res.status(401).json({error: err});
    // });
    try {
        const createdUser = await newUser.save();
        res.status(201).json({message: `${createdUser.fname} ${createdUser.lname} account was saved`});
    }
    catch (err) {
        res.status(401).json({message: err});
    }
});


// checks if user can log in
router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email: email})

    if (!user) {
        res.status(401).json({message: "Invalid credentials"});
    }

    if (user.password != password) {
        res.status(401).json({message: "Incorrect Password"});
    }

    res.status(201).json({message: "User can login"});
    //TODO CHANGE THE USERS LAST LOGGED IN TIME

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

    const weather = await fetch("http://api.openweathermap.org/data/2.5/weather?" + params);
        
    if (!weather) {
        res.status(400).json({message: "Weather API Failed"});
    }

    const data = weather.json();
    const localWeather = {
        weather: data,
        zip: zip
    }

    res.status(200).json(localWeather);

    // fetch("http://api.openweathermap.org/data/2.5/weather?" + params)
    //     .then(response => response.json())
    //     .then(data => {
    //         const localWeather = {
    //             data: data,
    //             zip: zip
    //         };

    //         res.status(200).json(localWeather);
    //     })
    //     .catch(err => {
    //         res.status(400).json({message: err});
    //     });

});


module.exports = router;

