// This is the schema model for our books collection
const mongoose = require("mongoose");
// we do this so that we don't have to say new mongoose.Schema later on
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  // Books can have more than one author so we make it an array of strings
  authors: [{ type: String, required: true }],
  link: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  googleId: { type: String, required: true, unique: true }
});

// Here we make the schema a mongoose model object so that we can export it
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
