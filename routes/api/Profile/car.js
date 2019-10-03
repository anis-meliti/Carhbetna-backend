const express = require('express');
const router = express.Router();
const auth = require('../../../middelware/auth');

// Schema
const Car = require('../../../models/Car');

//@Route    Get api/profile/preference
//@desc     Get current user prefrences
//@access   Private route

router.get('/', auth, async (req, res) => {
  try {
    const car = await Car.findOne({
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
router.post('/', auth, async (req, res) => {
  const { type, plateNum } = req.body;
  const carFields = {};
  carFields.user = req.user.id;
  if (type) carFields.type = type;
  if (plateNum) carFields.plateNum = plateNum;

  try {
    let car = await Car.findOne({ user: req.user.id });
    // Update
    if (car) {
      car = await Car.findOneUpdate(
        { user: req.user.id },
        { $set: carFields },
        { new: true, upsert: true }
      );
      return res.json(car);
    }

    // Create new preference
    car = new Preference(carFields);
    await car.save();
    res.json(car);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
