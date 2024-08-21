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

app.get("/api", function (req, res) {
  const now = new Date()
  res.json({ unix: now.getTime(), utc: now.toUTCString() })
})

app.get("/api/:date", function (req, res) {
  const { date } = req.params

  let parsedDate

  if (!date) {
    parsedDate = new Date()
  } else {
    parsedDate = new Date(date)
  }

  if (isNaN(parsedDate.getTime())) return res.json({ error: "Invalid Date" })

  res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() })
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port)
})
