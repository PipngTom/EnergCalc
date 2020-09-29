const mongoose = require("mongoose");

const MeasureUnTransSchema = new mongoose.Schema({
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
  deb: {
    type: Number,
    required: true,
  },
  lam: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = MeasureUnTrans = mongoose.model(
  "measureUnTrans",
  MeasureUnTransSchema
);
