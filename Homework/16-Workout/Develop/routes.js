var Workouts = require("./models/index");
var path = require("path");

module.exports = function(app) {
  // HTML Routes
  // Main route
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  // Route for the exercise page
  app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
  });

  app.get("/exercise?", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
  });
  // Route for the stats page
  app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
  });

  // API ROUTES!
  // Gets all workouts
  app.get("/api/workouts", function(req, res) {
    Workouts.find({})
      .then(data => {
        console.log(data);
        return res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // Writes a new entry to the existing workouts ({})
  app.post("/api/workouts/", function(req, res) {
    Workouts.create(req.body)
      .then(data => {
        console.log(data);
        return res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // Updates a workout object
  app.put("/api/workouts/:id", function(req, res) {
    Workouts.findOne({ _id: req.params.id })
      .then(data => {
        let exercisesArray = data.exercises;
        exercisesArray.push(req.body);
        console.log("Data.exercises: ");
        console.log(data.exercises);
        Workouts.updateOne(
          { _id: req.params.id },
          { $set: { exercises: exercisesArray } }
        )
          .then(data => {
            return res.json(data);
          })
          .catch(err => {
            console.log(err);
          });
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  //
  app.get("/api/workouts/range", function(req, res) {
    Workouts.find({ day: { $gte: new Date().getDate() - 7 } })
      .then(data => {
        console.log(data);
        return res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
