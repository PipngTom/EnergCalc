const express = require("express");
const router = express.Router();
const auth = require("../../routes/api/middleware/auth");
const Building = require("../../models/Building");
const User = require("../../models/User");

router.get("/me", auth, async (req, res) => {
  try {
    const foundBuildings = await Building.find({ user: req.user.id });

    if (!foundBuildings) {
      return res
        .status(400)
        .json({ msg: "There is no buildings in database...." });
    }

    res.json(foundBuildings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever error");
  }
});

router.get("/", async (req, res) => {
  try {
    const foundBuildings = await Building.find();

    if (!foundBuildings) {
      return res
        .status(400)
        .json({ msg: "There is no buildings in database...." });
    }

    res.json(foundBuildings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever error");
  }
});

router.post("/me", auth, async (req, res) => {
  //const user = await User.findById(req.user.id)
  try {
    const newBuilding = new Building({
      user: req.user.id,
      pov: req.body.pov,
      zap: req.body.zap,
      year: req.body.year,
      name: req.body.name,
    });

    const post = await newBuilding.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/me/:id", auth, async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);

    if (building.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await building.remove();

    res.json({ msg: "Building removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/me/:id", async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);

    res.json(building);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/me/trans/:id", auth, async (req, res) => {
  const { tip, uValue, povI, povZ, povS, povJ, fFactor } = req.body;

  const newTrans = {
    tip,
    uValue,
    povI,
    povZ,
    povS,
    povJ,
    fFactor,
  };

  try {
    const building = await Building.findOne({ _id: req.params.id });

    building.trans.push(newTrans);

    await building.save();

    res.json(building);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/me/ne-trans/:id", auth, async (req, res) => {
  const { tip, uValue, povI, povZ, povS, povJ } = req.body;

  const newUnTrans = {
    tip,
    uValue,
    povI,
    povZ,
    povS,
    povJ,
  };

  try {
    const building = await Building.findOne({ _id: req.params.id });
    building.neTrans.push(newUnTrans);
    await building.save();
    res.json(building);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/me/ne-trans/:build_id/:untrans_id", auth, async (req, res) => {
  try {
    const building = await Building.findOne({ _id: req.params.build_id });
    const removeIndex = building.neTrans
      .map((item) => item._id)
      .indexOf(req.params.untrans_id);
    building.neTrans.splice(removeIndex, 1);
    await building.save();
    res.json(building);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/me/trans/:build_id/:trans_id", auth, async (req, res) => {
  try {
    const building = await Building.findOne({ _id: req.params.build_id });
    const removeIndex = building.trans
      .map((item) => item._id)
      .indexOf(req.params.trans_id);
    building.trans.splice(removeIndex, 1);
    await building.save();
    res.json(building);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
