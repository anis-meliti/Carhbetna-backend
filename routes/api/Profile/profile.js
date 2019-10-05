const express = require('express');
const router = express.Router();
const auth = require('../../../middelware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../../models/Profile');
const User = require('../../../models/User');

//@Route    Get api/profile/profile
//@desc     Get current user profile
//@access   Private route

router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      [
        'lastName',
        'name',
        'mail',
        'avatar',
        'driverLicence',
        'discussion',
        'ponctuality',
        'music',
        'smoke',
        'car_modele',
        'car_plateNum'
      ]
    );
    !profile
      ? res.status(400).json({ msg: 'there is no profile for this user' })
      : res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//@Route    Post api/profile/profile
//@desc     Post current user profile
//@access   Private route

router.post(
  '/',
  [
    auth,
    [
      check('numTel', 'The phone num is resuired')
        .not()
        .isEmpty(),

      check('birthDate', 'the birth date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      gender,
      numTel,
      birthDate,
      miniBio,
      driverLicence,
      discussion,
      ponctuality,
      music,
      smoke,
      car_modele,
      car_plateNum
    } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (numTel) profileFields.numTel = numTel;
    if (birthDate) profileFields.birthDate = birthDate;
    if (miniBio) profileFields.miniBio = miniBio;
    if (driverLicence) profileFields.driverLicence = driverLicence;
    if (gender) profileFields.gender = gender;
    if (smoke) profileFields.smoke = smoke;
    if (music) profileFields.discussion = music;
    if (ponctuality) profileFields.ponctuality = ponctuality;
    if (discussion) profileFields.discussion = discussion;
    if (car_modele) profileFields.car_modele = car_modele;
    if (car_plateNum) profileFields.car_plateNum = car_plateNum;

    console.log('TCL: profileFields', profileFields);
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true }
        );
        return res.json(profile);
      }
      //Create new profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
