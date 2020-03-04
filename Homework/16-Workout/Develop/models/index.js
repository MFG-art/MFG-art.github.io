const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
  day: {
    required: [true, "The text field is required"],
    type: Date
  },
  exercises: [
    {
      type: {
        type: String,
        required: [true, "The text field is required"]
      },
      name: {
        type: String,
        required: [true, "The text field is required"]
      },
      duration: {
        type: Number,
        required: [true, "The text field is required"]
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      distance: {
        type: Number
      }
    }
  ]
});

WorkoutsSchema.virtual("totalDuration").get(function() {
  var totalDuration = 0;
  for (i = 0; i < this.exercises.length; i++) {
    totalDuration += this.exercises[i].duration;
  }
  return totalDuration;
});

const Workouts = mongoose.model("workout", WorkoutsSchema);

module.exports = Workouts;
