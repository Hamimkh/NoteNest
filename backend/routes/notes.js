const express = require("express");
const router = express.Router();
const Notes = require("../model/Notes");
const User = require("../model/Users");
const fetchuser = require("../middleware/fetchusers");
const { body, validationResult } = require("express-validator");

// Route-1: Get all the notes using GET: "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route-2: Add a new note using POST: "/api/notes/addnote". Login required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      const notes = new Notes({
        title,
        description,
        user: req.user.id,
      });

      const saveNotes = await notes.save();
      res.json(saveNotes);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Route-3: Update existing note using PUT: "/api/notes/updatenote/:id". Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description } = req.body;
  // Create a new note object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }

    // Find the note to be updated and update it
    let note = await Notes.findByIdAndUpdate(req.params.id);
    if (!note) {
      return res.status(400).send("404 Not Found!");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route-4: Delete existing note using DELETE: "/api/notes/deletenote/:id". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to delete it
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not allowed" });
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: "Note successfully deleted", note: note });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route-5: Share a note with another user using POST: "/api/notes/sharenote/:id". Login required.
router.post("/sharenote/:id", fetchuser, async (req, res) => {
  const { email } = req.body;

  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Check if the note is owned by the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ error: "Not allowed to share this note" });
    }

    // Find the user by email and add their ID to the note's sharedWith array
    const sharedUser = await User.findOne({ email });
    if (!sharedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    note.sharedWith.push(sharedUser._id);

    // Save the updated note
    await note.save();

    res.json({
      message: "Note shared successfully",
      sharedWith: note.sharedWith,
    });
  } catch (error) {
    console.error("Error sharing note:", error);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;
