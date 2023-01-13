////// Importing Dependencies //////
require("dotenv").config()
const { PORT = 3000 } = process.env // or const PORT = process.env.PORT || 3000
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bookmarkRouter = require('./controllers/router')

////// Application Object //////
const app = express()

////// Middleware //////
app.use(cors()) // Allows requests from external sites
app.use(morgan("dev")) // Logs requests to our url
app.use(express.json()) // Parses incoming json
app.use("/bookmark", bookmarkRouter) // Rnouter to be used when going to /bookmark

////// Routes //////
app.get("/", (req, res) =>{
    res.send("Let's do this team !")
})

////// App Listener //////
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))

