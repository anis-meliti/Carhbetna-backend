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
  }
});
module.exports = Profile = mongoose.model('profile', profileSchema);
