const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  authors: [
    {
      type: String
    }
  ],
  description: {
    type: String
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
