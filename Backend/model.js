const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  }
});

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
