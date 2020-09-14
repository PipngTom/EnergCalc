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
  }
});

module.exports = Building = mongoose.model('building', BuildingSchema);