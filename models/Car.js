const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  type: {
    type: String
  },
  plateNum: {
    type: String
  }
});

module.exports = Car = mongoose.model('car', CarSchema);
