const mongoose = require("mongoose");

const programSchema = mongoose.Schema({
  day: { type: Number, required: true },
  exercises: {
    amount: { type: Number, required: true },
    note: { type: String },
  },
  cardio: { amount: { type: Number, required: true }, note: { type: String } },
  meals: { amount: { type: Number, required: true }, note: { type: String } },
  vacuums: { amount: { type: Number, required: true }, note: { type: String } },
  feeder: { amount: { type: Number, required: true }, note: { type: String } },
});

module.exports = mongoose.model("Program", programSchema);
