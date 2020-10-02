const mongoose = require("mongoose");

const BuildingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  pov: {
    type: Number,
    required: true,
  },
  zap: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  trans: [
    {
      tip: String,
      opis: String,
      uValue: Number,
      povI: Number,
      povZ: Number,
      povS: Number,
      povJ: Number,
      fFactor: Number,
      g: Number,
    },
  ],
  neTrans: [
    {
      tip: String,
      opis: String,
      uValue: Number,
      povI: Number,
      povZ: Number,
      povS: Number,
      povJ: Number,
    },
  ],
  vent: {
    type: Number,
    required: true,
  },
  dPrekid: {
    type: Number,
    required: true,
  },
  nPrekid: {
    type: Number,
    required: true,
  },
  mPrekid: {
    type: Number,
    required: true,
  },
  tipGradnje: {
    type: String,
    required: true,
  },
});

module.exports = Building = mongoose.model("building", BuildingSchema);
