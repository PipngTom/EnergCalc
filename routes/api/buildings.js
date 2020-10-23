const express = require("express");
const router = express.Router();
const auth = require("../../routes/api/middleware/auth");
const fileUpload = require("../../routes/api/middleware/file-upload");
const Building = require("../../models/Building");
const User = require("../../models/User");
const fs = require('fs');

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

router.post("/me", auth, fileUpload.single('image'), async (req, res) => {
  //const user = await User.findById(req.user.id)
  console.log("FILEEEEEE", req.file);
  try {

    const newBuilding = new Building({
      user: req.user.id,
      image: req.file.path,
      pov: req.body.pov,
      zap: req.body.zap,
      year: req.body.year,
      name: req.body.name,
      vent: req.body.vent,
      dPrekid: req.body.dPrekid,
      nPrekid: req.body.nPrekid,
      mPrekid: req.body.mPrekid,
      tipGradnje: req.body.tipGradnje,
    });
    if (req.body._id) {
      console.log("AAAAAAA")
      oldBuilding = await Building.findById(req.body._id);
      building = await Building.findByIdAndUpdate(req.body._id, {
        user: req.user.id,
        image: req.file.path,
        pov: req.body.pov,
        zap: req.body.zap,
        year: req.body.year,
        name: req.body.name,
        vent: req.body.vent,
        dPrekid: req.body.dPrekid,
        nPrekid: req.body.nPrekid,
        mPrekid: req.body.mPrekid,
        tipGradnje: req.body.tipGradnje,
      }, { new: true })
      fs.unlink(oldBuilding.image, err => {
        console.log(err);
      });
      res.json(building);
    } else {
      console.log("BBBBBB")
      const post = await newBuilding.save();
      res.json(post);
    }


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
    fs.unlink(building.image, err => {
      console.log(err);
    });
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
  const { tip, opis, uValue, povI, povZ, povS, povJ, fFactor, g } = req.body;

  const newTrans = {
    tip,
    opis,
    uValue,
    povI,
    povZ,
    povS,
    povJ,
    fFactor,
    g,
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
  const { tip, opis, uValue, povI, povZ, povS, povJ } = req.body;

  const newUnTrans = {
    tip,
    opis,
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

router.post("/me/packages/:id", auth, async (req, res) => {
  //console.log(req.body);
  //console.log(req.params.id)
  const packages = req.body;
  //const { arrTrans, arrUnTrans, num } = req.body



  try {
    const building = await Building.findOne({ _id: req.params.id });
    // console.log(building.trans);
    packages.map((item) => {//iteracija kroz paket
      item.arrTrans.map((el) => {//iteracija kroz transparentne elemente
        console.log("Id elementa: ", el.idEl, "Id mere: ", el.idMeas);
        let addIndex = building.trans.map((item1) => item1._id).indexOf(el.idEl); //pronalazenje indeksa odgovarajuceg transparentnog elementa u zgradi
        let measIndex = building.trans[addIndex].meas.findIndex((item2) => item2.paket === item.num); //pronalazenje indexa objekta mere u nizu mera
        if (measIndex === -1)//ako u nizu mera ne pronadje onu sa tim brojem paketa
        {
          building.trans[addIndex].meas.push({      //dodaje u niz mera za taj element objekat koji sadrzi broj paketa i id mere
            paket: item.num, mera: el.idMeas
          })
        } else {
          console.log("USAOOOOOOOO")
          console.log("Bio ID mere: ", building.trans[addIndex].meas[measIndex].mera)
          building.trans[addIndex].meas.splice(measIndex, 1);
          building.trans[addIndex].meas.push({      //dodaje u niz mera za taj element objekat koji sadrzi broj paketa i id mere
            paket: item.num, mera: el.idMeas
          })
          //       building.trans[addIndex].meas[measIndex].mera = el.idMeas; //pronadjen je element koji ima isti naziv paketa i tada se samo azurira id mere
          console.log("Sada je ID mere: ", building.trans[addIndex].meas[measIndex].mera)
        }

      })

      //console.log(item);

    })

    packages.map((item) => {//iteracija kroz paket
      item.arrUnTrans.map((el) => {//iteracija kroz transparentne elemente
        console.log("Id elementa: ", el.idEl, "Id mere: ", el.idMeas);
        let addIndex = building.neTrans.map((item1) => item1._id).indexOf(el.idEl); //pronalazenje indeksa odgovarajuceg transparentnog elementa u zgradi
        let measIndex = building.neTrans[addIndex].meas.findIndex((item2) => item2.paket === item.num); //pronalazenje indexa objekta mere u nizu mera
        if (measIndex === -1)//ako u nizu mera ne pronadje onu sa tim brojem paketa
        {
          building.neTrans[addIndex].meas.push({      //dodaje u niz mera za taj element objekat koji sadrzi broj paketa i id mere
            paket: item.num, mera: el.idMeas
          })
        } else {
          console.log("USAOOOOOOOO")
          console.log("Bio ID mere: ", building.neTrans[addIndex].meas[measIndex].mera)
          building.neTrans[addIndex].meas.splice(measIndex, 1);
          building.neTrans[addIndex].meas.push({      //dodaje u niz mera za taj element objekat koji sadrzi broj paketa i id mere
            paket: item.num, mera: el.idMeas
          })
          //       building.trans[addIndex].meas[measIndex].mera = el.idMeas; //pronadjen je element koji ima isti naziv paketa i tada se samo azurira id mere
          console.log("Sada je ID mere: ", building.neTrans[addIndex].meas[measIndex].mera)
        }

      })

      //console.log(item);

    })
    await building.save();
    res.json(building);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/me/vent/:id", auth, async (req, res) => {
  console.log(req.body);
  //console.log(req.params.id)
  const vent = req.body;

  try {
    const building = await Building.findByIdAndUpdate(req.params.id, { packageVent: vent }, { new: true });

    await building.save();
    res.json(building);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
