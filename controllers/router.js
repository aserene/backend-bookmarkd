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
        res.json(bookmarks)
    })
    .catch(err => res.status(400).json(err)) // this is how we catch an error from the .then
})

// New route (Only needed for frontend)

// destroy route (delete route) method 1 (there are two other methods in writing a delete route, if you like the others better feel free to update)
router.delete('/:id', async (req, res) => {
    // get the id from params
    const id = req.params.id
    try {
        res.json(await bookmark.findByIdAndDelete(id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// update route
router.put('/:id', async (req, res) => {
    // get the id from params
    const id = req.params.id

    try {
        res.json(await bookmark.findByIdAndUpdate(id, req.body, {new: true}) )
    } catch(error) {
        res.status(400).json(error)
    }
})

// Create route
router.post("/", async (req, res) => {
    try {
       res.json(await bookmark.create(req.body))
    } catch(error) {
        res.status(400).json(error)
    }
})

module.exports = router;