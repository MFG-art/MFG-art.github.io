var express = require("express");
var path = require("path");
var router = express.Router();

// HTML GET ROUTES
router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//API ROUTES
router.get("/api/notes", function(req, res) {
  const database = fs.readFileSync(path.join(__dirname, "db/db.json"), "utf8");
  return database;
});

module.exports = router;
