const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sharedWith: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" }],
    
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NotesSchema);
