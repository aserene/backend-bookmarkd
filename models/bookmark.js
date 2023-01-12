const mongoose = require('./connection')

const BookmarksSchema = new mongoose.Schema({
    title: String,
    url: String
})
const Bookmarks = mongoose.model("Bookmarks", BookmarksSchema)

module.exports = Bookmarks