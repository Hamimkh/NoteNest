const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShareSchema = new Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    sender_username: {
      type: String,
      ref: "users",
    },
  
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    note_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes",
    },
    Sharenote: {
     title: String,
     description: String,
   },
   sender_username: {
    type: String,
  },
  },
  { timestamps: true }
);

const Share = mongoose.model("sharednotes", ShareSchema);
module.exports = Share;
