import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import TransElMeas from "./TransElMeas";
import UnTransElMeas from "./UnTransElMeas";
import { enerCalc } from "./enerCalc";
import { addMeasuresArray } from "../../actions/buildings";

const Package = ({ building, packageNum, addMeasuresArray }) => {
  const [rez, setRez] = useState(null);

  const [sumUnTrans, setSumUnTrans] = useState(null);
  const [sumTrans, setSumTrans] = useState(null);
  const [newBuild, setNewBuilding] = useState(_.cloneDeep(building));
  const [IdpairsUnTrans, setIdpairsUnTrans] = useState(null);
  const [IdpairsTrans, setIdpairsTrans] = useState(null);
  useEffect(() => {
    addMeasuresArray(IdpairsTrans, IdpairsUnTrans, packageNum);
  }, [IdpairsTrans, IdpairsUnTrans]);


  const setUvalues = (val, tip) => {
    if (tip === "UN") {
      val.map((item, index) => {
        newBuild.neTrans[index].uValue = item;
      });
    }
    if (tip === "TR") {
      val.map((item, index) => {
        newBuild.trans[index].uValue = item;
      });
    }

    setNewBuilding(newBuild);

    console.log("New Building: ", newBuild);

    console.log("Building: ", building);
    console.log("Package umber: ", packageNum);
    console.log("Id pairs Untrans: ", IdpairsUnTrans);

    setRez(enerCalc(newBuild));
  };

  return (
    <Fragment>
      <div>{building.name}</div>
      <TransElMeas
        element={building.trans}
        packageNum={packageNum}
        getSum={(sum) => setSumTrans(sum)}
        getIdpairs={(idpairs) => setIdpairsTrans(idpairs)}
        getUvalues={(val, tip) => setUvalues(val, tip)}
      ></TransElMeas>
      <UnTransElMeas
        element={building.neTrans}
        packageNum={packageNum}
        getSum={(sum) => setSumUnTrans(sum)}
        getIdpairs={(idpairs) => setIdpairsUnTrans(idpairs)}
        getUvalues={(val, tip) => setUvalues(val, tip)}
      ></UnTransElMeas>
      <Container>
        <Row>
          <Col>
            <b>Qhnd za paket: {rez && rez.Qhint.toFixed(0)}</b>
          </Col>
          <Col>
            <b>
              USTEDA [kWh]:{" "}
              {rez && (enerCalc(building).Qhint - rez.Qhint).toFixed(0)}
            </b>
          </Col>
          <Col>
            <b>Ukupna investicija za paket iznosi: {sumUnTrans + sumTrans}</b>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <b>
              Prost period otplate investicije iznosi:{" "}
              {rez &&
                enerCalc(building).Qhint - rez.Qhint !== 0 &&
                (
                  (sumUnTrans + sumTrans) /
                  ((enerCalc(building).Qhint - rez.Qhint) * 0.067)
                ).toFixed(0)}{" "}
              {rez && enerCalc(building).Qhint - rez.Qhint !== 0 && "godina"}
            </b>
          </Col>
        </Row>
      </Container>
      {IdpairsTrans &&
        IdpairsTrans.map((item, index) => {
          return <div key={index}>Trans {item.idMeas}</div>;
        })}
      {IdpairsUnTrans &&
        IdpairsUnTrans.map((item, index) => {
          return <div key={index}>Netrans {item.idMeas}</div>;
        })}
    </Fragment>
  );
};

Package.propTypes = {
  building: PropTypes.object.isRequired,
  packageNum: PropTypes.number.isRequired,
  addMeasuresArray: PropTypes.func.isRequired
};

export default connect(null, { addMeasuresArray })(Package);
