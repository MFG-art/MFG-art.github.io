const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  authors: [
    {
      type: String,
      required: [true, "At least one author is required"]
    }
  ],
  description: {
    type: String,
    required: [true, "A description is required"]
  },
  image: {
    type: String,
    required: [true, "An image link is required"]
  },
  link: {
    type: String,
    required: [true, "A Google Books link is required"]
  },
  title: {
    type: String,
    required: [true, "A book title is required"]
  }
});

const ShoppingList = mongoose.model("books", BookSchema);

module.exports = ShoppingList;
