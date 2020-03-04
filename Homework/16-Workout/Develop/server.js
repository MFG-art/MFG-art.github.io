var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var logger = require("morgan");
require("dotenv").config();

var app = express();
var PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err));

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./routes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
