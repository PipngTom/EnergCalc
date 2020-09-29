const mongoose = require("mongoose");

const MeasureTransSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  tip: {
    type: String,
    required: true,
  },
  opis: {
    type: String,
    required: true,
  },
  uValue: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = MeasureTrans = mongoose.model(
  "measureTrans",
  MeasureTransSchema
);
