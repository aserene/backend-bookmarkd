// bring in express 
const express = require('express')
// bring in your bookmarks  
const bookmark = require('../models/bookmark')

////////////////////////
// create router variable to attach routes 
///////////////////////
const router = express.Router()

///////////////////////
// actual routes below 
//////////////////////

// index route using the .then method
router.get('/', (req, res) => {
    // get all bookmarks from mongo and send them back to index.ejs
    bookmark.find({})
    .then((bookmarks) => {
        //res.json(bookmarks)
        res.render('bookmarks/index.ejs', {bookmarks})
    })
    .catch(err => console.log(err)) // this is how we catch an error from the .then
})

// new route
router.get("/new", (req, res) => {
    res.render("bookmarks/new.ejs")
})

// destroy route (delete route) method 1 (there are two other methods in writing a delete route, if you like the others better feel free to update)
router.delete('/:id', (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the bookmark
    bookmark.findByIdAndDelete(id, (err, deletedBookmark) => {
        // the console.log shows me my route is working in my terminal
        console.log(err, deletedBookmark)
        // redirect me back to my main page of bookmarks
        res.redirect('/bookmarks')
    })
})

// update route
router.put('/:id', (req, res) => {
    // get the id from params
    const id = req.params.id
    // check if the readyToBookmark property should be true or false
    req.body.readyToBookmark = req.body.readyToBookmark === 'on' ? true : false
    // update the bookmark
    bookmark.findByIdAndUpdate(id, req.body, { new: true }, (err, updatedBookmark) => {
        // the console.log shows the updated bookmark working in my terminal
        console.log(updatedBookmark, err)
        // redirect me back to the main page of bookmarks and it will show me the updated bookmark
        res.redirect('/bookmarks')
    })
})

module.exports = router;