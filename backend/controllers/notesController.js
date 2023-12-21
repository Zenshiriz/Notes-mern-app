const Notes = require("../models/Notes");

const fetchAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.log(error);
  }
};

const addNotes = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id, // Associate the note with the authenticated user's ID
    });
    const newNotes = await note.save();
    res.json(newNotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found ");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed ");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const deleteNote = async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found ");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed ");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted successfully ");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

module.exports = { fetchAllNotes, addNotes, updateNote, deleteNote };
