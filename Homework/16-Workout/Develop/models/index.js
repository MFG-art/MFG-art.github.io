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

const Workouts = mongoose.model("workout", WorkoutsSchema);

module.exports = Workouts;
