const express = require('express');
const router = express.Router();
const auth = require('../../../middelware/auth');
const { check, validationResult } = require('express-validator');

// Schema
const Preference = require('../../../models/Preference');

//@Route    Get api/profile/preference
//@desc     Get current user prefrences
//@access   Private route

router.get('/', auth, async (req, res) => {
  try {
    const preference = await Preference.findOne({
      user: req.user.id
    }).populate('user', ['lastName', 'name', 'mail', 'avatar']);
    !preference
      ? res.status(400).json({ msg: 'there is no preferences for this user' })
      : res.json(preference);
  } catch (error) {
    console.error(error);
    res.status(500).send('server error');
  }
});

//@Route    Post api/profile/preference
//@desc     Post current user preferences
//@access   Private route
router.post(
  '/',
  [
    auth,
    [
      check('smoke', 'The smoke is resuired')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { discussion, smoke, music } = req.body;
    console.log('TCL: music', music);
    console.log('TCL: smoke', smoke);
    console.log('TCL: discussion', discussion);
    const preferenceFields = {};
    preferenceFields.user = req.user.id;
    if (discussion) preferenceFields.discussion = discussion;
    if (smoke) preferenceFields.smoke = smoke;
    if (music) preferenceFields.music = music;
    try {
      let preference = await Preference.findOne({ user: req.user.id });
      // Update
      if (preference) {
        perference = await Preference.findOneAndUpdate(
          { user: req.user.id },
          { $set: preferenceFields },
          { new: true, upsert: true }
        );

        return res.json(preference);
      }

      // Create new preference
      preference = new Preference(preferenceFields);
      await preference.save();
      res.json(preference);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
