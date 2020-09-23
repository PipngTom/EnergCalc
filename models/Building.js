const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  pov: {
    type: Number,
    required: true
  },
  zap: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  trans: [
    {
      tip: String,
      uValue: Number,
      povI: Number,
      povZ: Number,
      povS: Number,
      povJ: Number,
      fFactor: Number
    }
  ],
  neTrans: [
    {
      tip: String,
      uValue: Number,
      povI: Number,
      povZ: Number,
      povS: Number,
      povJ: Number
    }
  ]
});

module.exports = Building = mongoose.model('building', BuildingSchema);