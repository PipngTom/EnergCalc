export const enerCalc = (building) => {
  //if (building.trans && building.neTrans) return 0;
  const HDD = [124, 459, 653, 720, 563, 455, 126];
  const danaMesec = [15, 30, 31, 31, 28, 31, 15];
  const clasaObjekta = [
    { name: "A+", from: 0, to: 12 },
    { name: "A", from: 12, to: 20 },
    { name: "B", from: 20, to: 38 },
    { name: "C", from: 38, to: 75 },
    { name: "D", from: 75, to: 113 },
    { name: "E", from: 113, to: 150 },
    { name: "F", from: 150, to: 188 },
    { name: "G", from: 188, to: 10000000 },
  ];
  const zracenje = [
    { H: 88.94, J: 109.22, S: 29.16, I: 67.21, Z: 67.21 },
    { H: 45.5, J: 66.52, S: 17.93, I: 34.67, Z: 34.67 },
    { H: 33.87, J: 52.8, S: 14.31, I: 25.53, Z: 25.53 },
    { H: 42.75, J: 64.25, S: 17.42, I: 32.57, Z: 32.57 },
    { H: 60.35, J: 76.98, S: 22.38, I: 55.35, Z: 55.35 },
    { H: 103.86, J: 96.43, S: 36.04, I: 79.8, Z: 79.8 },
    { H: 133.65, J: 86.73, S: 44.64, I: 96.05, Z: 96.05 },
  ];
  const prisutnost = 12;
  const odavanjePoPov = 1.8;
  const potrosnjaUredj = 30;
  const brojIzmenaVaz = 0.5;
  const tipObjekta = 165000;
  const dnevniPrekid = 8;
  const nedeljniPrekid = 2;
  const Qhnd = [0, 0, 0, 0, 0, 0, 0];
  const Qtrans = [0, 0, 0, 0, 0, 0, 0];
  const Qvent = [0, 0, 0, 0, 0, 0, 0];
  const Qsoltr = [0, 0, 0, 0, 0, 0, 0];
  const Qsolnetr = [0, 0, 0, 0, 0, 0, 0];
  const Qlj = [0, 0, 0, 0, 0, 0, 0];
  const Qure = [0, 0, 0, 0, 0, 0, 0];
  const gama = [0, 0, 0, 0, 0, 0, 0];
  const ni = [0, 0, 0, 0, 0, 0, 0];
  const aRed = [0, 0, 0, 0, 0, 0, 0];
  const Qhndint = [0, 0, 0, 0, 0, 0, 0];
  const netrans = [
    { tip: "spoljni zid", uValue: 1, povI: 10, povJ: 10, povS: 10, povZ: 10 },
    { tip: "zid u tlu", uValue: 1, povI: 10, povJ: 10, povS: 10, povZ: 10 },
  ];
  let povOm = 0;
  let Ht = 0;
  let Htb = 0;
  let Hv = 0;

  //calculation of transmission coeff
  if (building.trans && building.trans.length !== 0) {
    building.trans.map((item) => {
      const pov = item.povI + item.povZ + item.povS + item.povJ;
      povOm = povOm + pov;
      Ht = Ht + pov * item.uValue;
    });
  }
  if (building.neTrans && building.neTrans.length !== 0) {
    building.neTrans.map((item) => {
      const pov = item.povI + item.povZ + item.povS + item.povJ;
      povOm = povOm + pov;
      Ht = Ht + pov * item.uValue;
    });
  }

  Htb = povOm / 10;
  Ht = Ht + Htb;

  //calculation of ventilation coeff
  Hv = 0.33 * brojIzmenaVaz * building.zap;

  //calculation of transmision heat loss
  HDD.map((item, index) => {
    Qtrans[index] = (item * Ht * 24) / 1000;
  });
  //calculation of ventilation heat loss
  HDD.map((item, index) => {
    Qvent[index] = (item * Hv * 24) / 1000;
  });

  //calculation of solar heat gains - trans
  if (building.trans && building.trans.length !== 0) {
    building.trans.map((item) => {
      zracenje.map((zra, index) => {
        //      debugger;
        Qsoltr[index] =
          Qsoltr[index] +
          (zra.I * item.povI +
            zra.J * item.povJ +
            zra.S * item.povS +
            zra.Z * item.povZ) *
            0.9 *
            item.fFactor *
            0.7;
      });
    });
  }

  //calculation of solar heat gains - netrans
  if (building.neTrans && building.neTrans.length !== 0) {
    building.neTrans.map((item) => {
      zracenje.map((zra, index) => {
        //      debugger;
        Qsolnetr[index] =
          Qsolnetr[index] +
          (zra.I * item.povI +
            zra.J * item.povJ +
            zra.S * item.povS +
            zra.Z * item.povZ) *
            0.9 *
            item.uValue *
            0.6 *
            0.04;
      });
    });
  }

  //calculation of human heat gains

  danaMesec.map((item, index) => {
    Qlj[index] = (item * prisutnost * odavanjePoPov * building.pov) / 1000;
  });

  //calculation of electrical heat gains

  danaMesec.map((item, index) => {
    Qure[index] = (item * building.pov * potrosnjaUredj) / 365;
  });

  // calculation of gain-losses ratio - gamma

  for (let i = 0; i < 7; i++) {
    gama[i] =
      (Qsoltr[i] + Qsolnetr[i] + Qlj[i] + Qure[i]) / (Qtrans[i] + Qvent[i]);
  }

  //calculation of coeff on utilization of heat gain -ni

  const Cm = tipObjekta * building.pov;
  const tau = Cm / 3600 / (Ht + Hv);
  const ah = 1 + tau / 15;
  gama.map((item, index) => {
    ni[index] = (1 - Math.pow(item, ah)) / (1 - Math.pow(item, ah + 1));
  });

  //calculation of Qhnd

  ni.map((item, i) => {
    Qhnd[i] =
      Qtrans[i] +
      Qvent[i] -
      item * (Qsoltr[i] + Qsolnetr[i] + Qlj[i] + Qure[i]);
  });

  //calculation of coeff of reduction ah,red
  const tauRatio = 15 / tau;
  const Fhhr = ((7 - nedeljniPrekid) * (24 - dnevniPrekid)) / (7 * 24);
  gama.map((item, index) => {
    if (1 - 3 * tauRatio * item * (1 - Fhhr) < Fhhr) {
      aRed[index] = Fhhr;
    } else {
      aRed[index] = 1 - 3 * tauRatio * item * (1 - Fhhr);
    }
  });

  //calculation of Qhnd intermitent

  Qhnd.map((item, index) => {
    Qhndint[index] = item * aRed[index];
  });

  // console.log("Qtrans ", Qtrans);
  // console.log("Qvent ", Qvent);
  // console.log("Qsoltr ", Qsoltr);
  // console.log("Qsolnetr ", Qsolnetr);
  // console.log("Qlj ", Qlj);
  // console.log("Qure ", Qure);
  // console.log("Gamma ", gama);
  // console.log("Ni ", ni);
  // console.log("Qhnd ", Qhnd);
  // console.log(Fhhr);
  // console.log("aRed ", aRed);
  // console.log("Qhndint ", Qhndint);
  // console.log(
  //   "Qhndint for whole year ",
  //   Qhnd.reduce((a, b) => a + b)
  // );
  const Qhint = Qhndint.reduce((a, b) => a + b);
  // console.log("povrsina omot: ", povOm, "Ht: ", Ht, "Htb ", Htb, "Hv: ", Hv);
  const klasa = clasaObjekta.find((item) => {
    return item.from < Qhint / building.pov && item.to >= Qhint / building.pov;
  }).name;
  // console.log(klasa);
  return { Qhint: Qhint, klasa: klasa };
};
