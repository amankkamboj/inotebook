const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default:"General",
  },
  timestamp: { type: Date, default: Date.now },
});

const Notes = mongoose.model('notes',noteSchema);
module.export=Notes;
