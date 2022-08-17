const express = require("express");
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//Route 1 : Fetching all user notes using GET request at endpoints api/notes/fetchallnotes  Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
})


//Route 2 : Adding new  notes using POST request at endpoints api/notes/addnote   LoggedIn Required
router.post('/addnote', fetchuser, [
    body('title', 'Enter Title atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Enter description atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {


    //checking whether all input are according to requirement or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Taking all the inputs from the user
        const { title, description, tag } = req.body;

        const note = new Note({
            title, description, tag, user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);

    }
    catch (error) {
        res.status(500).send("Some Error has been occured");
    }


})


//Route 3 : Updating notes using PUT request at endpoints api/notes/updatenote  Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    try {
        //Creating a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        const note = await Note.findById(req.params.id);

        //If that note does not exists
        if (!note) { return res.status(401).send("Note Does Not Exists") }

        //If Note does not belong to the user who is trying to update
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("You are not allowed to update this note");
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(updatedNote);


    } catch (error) {
        res.status(500).send("Internal Server Occured")
    }

})


//Route 4 : Deleting  user notes using DELETE request at endpoints api/notes/deletenote  Loggedin Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    try {
        let note = await Note.findById(req.params.id);

        //If note does not exists
        if (!note) { return res.status(404).send("Note does not exists") }

        //If User does not belong to the note which he wants to delete
        if (note.user.toString() != req.user.id) {
            return res.status(404).send("You are not allowed to delete this note");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.status(200).send("Note Deleted Successfully");



    } catch (error) {
        res.status(500).send("Internal Server Occured")
    }

})

module.exports = router;