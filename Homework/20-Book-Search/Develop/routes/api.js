const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/books", (req, res, next) => {
  Book.find({})
    .then(data => res.json(data))
    .catch(next);
});

router.post("/books", (req, res, next) => {
  console.log(req.body);
  console.log("\n\n\n");
  if (req.body) {
    Book.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({ error: "The item field is empty" });
  }
});

router.delete("/books/:id", (req, res, next) => {
  Book.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
