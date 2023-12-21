const express = require('express')
const router = express.Router()
const {fetchAllNotes, addNotes,updateNote,deleteNote} = require("../controllers/notesController")
const fetchUser = require('../middleware/fetchUser')
router.route('/fetchallnotes').get(fetchUser ,fetchAllNotes)
router.route('/addnote').post(fetchUser ,addNotes)
router.route('/updatenote/:id').put(fetchUser ,updateNote)
router.route('/deletenote/:id').delete(fetchUser ,deleteNote)

module.exports = router