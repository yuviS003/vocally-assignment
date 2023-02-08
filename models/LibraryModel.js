const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
    unique: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookEdition: {
    type: Number,
    required: true,
  },
  bookPrice: {
    type: Number,
    required: true,
  },
  isBookIssued: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Library", librarySchema);
