const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShareSchema = new Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    Sharenote: {
        type: String,
        required: true
    }
  },

  {timestamps: true});

  const Share = mongoose.model('Shared-Note', ShareSchema);
  module.exports = Share;