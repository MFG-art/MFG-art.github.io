var Workouts = require("./models/index");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

  app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
  });

  app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
  });

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

  app.post("/api/workouts", function(req, res) {
    Workouts.create(req.body)
      .then(data => {
        console.log(data);
        return res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
