const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  gender: {
    type: String
  },
  numTel: {
    type: String
  },
  birthDate: {
    type: String
  },
  miniBio: {
    type: [String]
  },
  driverLicence: {
    type: String
  },
  car_modele: {
    type: String
  },
  car_plateNum: {
    type: String
  },

  discussion: {
    type: String
  },
  smoke: {
    type: String
  },
  music: {
    type: String
  },
  ponctuality: {
    type: String
  }
});
module.exports = Profile = mongoose.model('profile', profileSchema);
