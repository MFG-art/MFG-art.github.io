const fs = require("fs");
const express = require("express");
const path = require("path");

var app = express();
var PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML GET ROUTES
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

//API ROUTES
app.get("/api/notes", function(req, res) {
  const database = fs.readFileSync(path.join(__dirname, "db/db.json"), "utf8");
  console.log(database);
  res.json(database);
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/api/notes", function(req, res) {
  database = req.body;
  databaseString = JSON.stringify(database);
  console.log("Inside of the POST route: ");
  console.log(database);
  fs.writeFileSync(path.join(__dirname, "db/db.json"), databaseString, "utf8");
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
