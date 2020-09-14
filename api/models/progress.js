const mongoose = require("mongoose");

const progressSchema = mongoose.Schema({
  email: { type: String, required: true },
  day: { type: Number, required: true },

  cardio: { type: Boolean, required: true },
  exercises: { type: Boolean, required: true },
  feeder: { type: Array, required: true },
  meals: { type: Array, required: true },
  vacuums: { type: Array, required: true },
});

module.exports = mongoose.model("Progress", progressSchema);
