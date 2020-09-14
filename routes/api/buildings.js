const express = require('express');
const router = express.Router();
const auth = require('../../routes/api/middleware/auth');
const Building = require('../../models/Building');
const User = require('../../models/User');

router.get('/me', auth, async (req, res) => {
  try {
    const foundBuildings = await Building.find({user: req.user.id});

    if(!foundBuildings) {
      return res.status(400).json({msg: 'There is no buildings in database....'});
    }

    res.json(foundBuildings);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Sever error');
  }
});

router.post('/me', auth, async (req, res) => {
  //const user = await User.findById(req.user.id)
try {
  const newBuilding = new Building({
    user: req.user.id,
    pov: req.body.pov,
    zap: req.body.zap,
    year: req.body.year
  });

  const post = await newBuilding.save();
  res.json(post);
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error')
}
 
})

module.exports = router;