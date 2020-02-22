var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var morgan = require("morgan");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
