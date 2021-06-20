const express = require("express")
const router = express.Router();
require('dotenv').config()
const fetch = require('node-fetch')

router.get("/", (req,res) => {
    res.render("index", {
      city: null,
      desc: null,
      icon: null,
      temperature: null,
    });
})
router.post("/", async (req,res) => {
    // console.log(req.body);
    const city = req.body.city;
    const url_api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
    try {
        await fetch(url_api)
        .then(res => res.json())
        .then(data => {
            if(data.message === "city not found") {
                res.render('index', {
                    city:data.message,
                    desc: null,
                    icon: null,
                    temperature: null,
                })
            } else {
                const city = data.name;
                const desc = data.weather[0].description;
                const icon = data.weather[0].icon;
                const temperature = data.main.temp;
                res.render('index', {city,desc,icon,temperature});
            }
        })
    } catch (error) {
        res.render('index', {
            city: "something wrong, try again",
            desc: null,
            icon: null,
            temperature: null,
        })
        
    }
})

module.exports = router;