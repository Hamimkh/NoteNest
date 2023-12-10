const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShareSchema = new Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    sender_username: {
      type: String,
      ref: "User",
    },
  
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    note_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes",
    },
    Sharenote: {
     title: String,
     description: String,
   },
  },
  { timestamps: true }
);

const Share = mongoose.model("sharedNotes", ShareSchema);
module.exports = Share;
