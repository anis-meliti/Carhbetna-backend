const mongoose = require('mongoose');

const PreferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  discussion: {
    type: String
  },
  smoke: {
    type: String
  },
  music: {
    type: String
  }
});
module.exports = Preference = mongoose.model('preference', PreferenceSchema);
