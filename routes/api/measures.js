const express = require("express");
const router = express.Router();
const auth = require("../../routes/api/middleware/auth");
const MeasureTrans = require("../../models/MeasureTrans");
const MeasureUnTrans = require("../../models/MeasureUnTrans");
const Building = require("../../models/Building");

router.post("/measure-trans", auth, async (req, res) => {
  try {
    const newMeasureTrans = new MeasureTrans({
      user: req.user.id,
      tip: req.body.tip,
      opis: req.body.opis,
      uValue: req.body.uValue,
      price: req.body.price,
    });
    if (req.body._id) {
      console.log("AAAAAAA")
      measure = await MeasureTrans.findByIdAndUpdate(req.body._id, {
        user: req.user.id,
        tip: req.body.tip,
        opis: req.body.opis,
        uValue: req.body.uValue,
        price: req.body.price,
      }, { new: true });
      res.json(measure);
    } else {
      console.log("BBBBBB")
      const measureTrans = await newMeasureTrans.save();
      res.json(measureTrans);
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/measure-untrans", auth, async (req, res) => {
  try {
    const newMeasureUnTrans = new MeasureUnTrans({
      user: req.user.id,
      tip: req.body.tip,
      opis: req.body.opis,
      deb: req.body.deb,
      lam: req.body.lam,
      price: req.body.price,
    });

    if (req.body._id) {
      console.log("AAAAAAA")
      measure = await MeasureUnTrans.findByIdAndUpdate(req.body._id, {
        user: req.user.id,
        tip: req.body.tip,
        opis: req.body.opis,
        deb: req.body.deb,
        lam: req.body.lam,
        price: req.body.price,
      }, { new: true });
      res.json(measure);
    } else {
      console.log("BBBBBB")
      const measureUnTrans = await newMeasureUnTrans.save();
      res.json(measureUnTrans);
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/measure-trans", auth, async (req, res) => {
  try {
    const foundMeasure = await MeasureTrans.find({ user: req.user.id });
    if (!foundMeasure) {
      return res.status(400).json({ msg: "There is no measure in database" });
    }
    res.json(foundMeasure);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/measure-untrans", auth, async (req, res) => {
  try {
    const foundUntransMeasure = await MeasureUnTrans.find({
      user: req.user.id,
    });
    if (!foundUntransMeasure) {
      return res.status(400).json({ msg: "There is no measure in database" });
    }
    res.json(foundUntransMeasure);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/measure-trans/:id", auth, async (req, res) => {
  try {
    const transMe = await MeasureTrans.findById(req.params.id);
    if (transMe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    const buildings = await Building.find({ user: req.user.id }) //pronalazi sve zgrade od korisnika


    buildings.forEach(async (building) => {
      building.trans.forEach((tra) => {
        tra.meas.forEach((mea) => {
          if (mea.mera === req.params.id) {
            mea.mera = 0;
          }
        });
      });



      const rez = await Building.findByIdAndUpdate(building._id, { trans: building.trans }, { new: true });


    });

    transMe.remove();
    res.json({ msg: "Measure removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/measure-untrans/:id", auth, async (req, res) => {
  try {
    const unTransMe = await MeasureUnTrans.findById(req.params.id);
    if (unTransMe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    const buildings = await Building.find({ user: req.user.id }) //pronalazi sve zgrade od korisnika


    buildings.forEach(async (building) => {
      building.neTrans.forEach((tra) => {
        tra.meas.forEach((mea) => {
          if (mea.mera === req.params.id) {
            mea.mera = 0;
          }
        });
      });



      const rez = await Building.findByIdAndUpdate(building._id, { neTrans: building.neTrans }, { new: true });


    });
    unTransMe.remove();
    res.json({ msg: "Measure removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
