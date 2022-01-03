/**
 * ===============================
 *            BINDINGS
 * ===============================
 */
const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")
const logger = require("morgan-body")
const fs = require("fs")
const path = require("path")
const cors = require("cors")
require("dotenv").config()
let host = process.env.HOST
let port = process.env.PORT

/**
 * ===============================
 *              SETUP
 * ===============================
 */
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const apikey = `?apikey=${process.env.WEATHER_API_KEY}`
const conditions = "http://dataservice.accuweather.com/currentconditions/v1/"
const dailyForecast = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/"

var api = {
    Temperature: {},
    Dawn: "",
    Dusk: ""
}
/**
 * ===============================
 *           LOG WRITER
 * ===============================
 */
const log = fs.createWriteStream(
    path.join(__dirname, "./logs", "user_request.log"), {flags: "a"}
) 

logger(app, {
    noColors: true,
    stream: log
})

/**
 * ===============================
 *             ROUTES
 * ===============================
 */
const suggestions = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete"
app.get("/suggestions/:city", (req, res) => {
    http.get(suggestions + apikey + `&q=${req.params.city}`, (resp) => {
        let data = ''
        resp.on('data', (chunk) => { data += chunk })
        resp.on('end', () => {
            let d = JSON.parse(data)
            res.send(d)
        })
    })
})

app.get("/cities/:key", (req, res, next) => {            
    http.get(conditions + req.params.key + apikey, (resp) => {
        data = ''
        resp.on('data', (chunk) => data += chunk)
        resp.on('end', () => {
            // get the temperature of the city
            let cityData = JSON.parse(data)[0]
            api.Temperature = cityData["Temperature"]["Metric"]["Value"]
            http.get(dailyForecast + req.params.key + apikey + "&details=true", (resp) => {
                data = ''
                resp.on('data', (chunk) => data += chunk)
                resp.on('end', () => {
                    // get the rest of the info of the city
                    let d = JSON.parse(data)
                    api.Dawn = d.DailyForecasts[0].Sun.EpochRise
                    api.Dusk = d.DailyForecasts[0].Sun.EpochSet
                    res.json(api)
                })
            })

        })
    }).on("error", (err) => {
    console.log("Error: " + err.message)
    })
})

/**
 * ===============================
 *               RUN
 * ===============================
 */
app.listen(port, host, () => {
    console.log("server running on localhost:", port)
})