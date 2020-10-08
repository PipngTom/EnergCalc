import React, { Fragment, useState, useEffect } from "react";
import _ from "lodash";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import TransElMeas from "./TransElMeas";
import UnTransElMeas from "./UnTransElMeas";
import { enerCalc } from "./enerCalc";

const Package = ({ building }) => {
  const [rez, setRez] = useState(null);
  /*  useEffect(() => {
    setQhnd(enerCalc(newBuilding));
  }, [newBuilding]); */
  const [sumUnTrans, setSumUnTrans] = useState(null);
  const [sumTrans, setSumTrans] = useState(null);
  const [newBuild, setNewBuilding] = useState(_.cloneDeep(building));
  const [IdpairsUnTrans, setIdpairsUnTrans] = useState(null);
  const [IdpairsTrans, setIdpairsTrans] = useState(null);

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
    console.log("Id pairs Untrans: ", IdpairsUnTrans);
    setRez(enerCalc(newBuild));
  };

  return (
    <Fragment>
      <div>{building.name}</div>
      <TransElMeas
        element={building.trans}
        getSum={(sum) => setSumTrans(sum)}
        getIdpairs={(idpairs) => setIdpairsTrans(idpairs)}
        getUvalues={(val, tip) => setUvalues(val, tip)}
      ></TransElMeas>
      <UnTransElMeas
        element={building.neTrans}
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
};

export default Package;
