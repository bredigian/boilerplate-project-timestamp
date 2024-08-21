// index.js
// where your node app starts

// init project
var express = require("express")
var dotenv = require("dotenv")
var app = express()

dotenv.config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors")
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html")
})

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" })
})

app.get("/api/:date", function (req, res) {
  const { date } = req.params

  if (!date) {
    const now = new Date()
    return res.json({ unix: now.getTime(), utc: now.toUTCString() })
  }

  const isMilliseconds = !isNaN(date)

  const regex =
    /^(19[7-9]\d|20\d{2}|2[1-9]\d{2}|[3-9]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
  const isDateFormat = regex.test(date)

  if (!isMilliseconds && !isDateFormat)
    return res.status(400).json({ error: "Invalid Date" })

  const objectDate = new Date(isMilliseconds ? Number(date) : date)

  res.json({ unix: objectDate.getTime(), utc: objectDate.toUTCString() })
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port)
})
