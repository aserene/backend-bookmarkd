require("dotenv").config()
const { PORT = 3000, DATABASE_URL } = process.env
// or const PORT = process.env.PORT || 3000
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()
const mongoose = require("mongoose")
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.connection
.on("open", () => console.log("Mongoose connected"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))
const BookmarksSchema = new mongoose.Schema({
    title: String,
    url: String
})
const Bookmarks = mongoose.model("Bookmarks", BookmarksSchema)
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
////// Routes //////
app.get("/", (req, res) =>{
    res.send("Let's do this team 1")
})
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))