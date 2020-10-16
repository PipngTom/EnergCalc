import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBuilding } from "../../actions/buildings";
import { useHistory, Link } from "react-router-dom";

const BuildingForm = ({ addBuilding }) => {
  const [allValues, setAllValues] = useState({
    pov: 0,
    zap: 0,
    year: 0,
    name: "",
    vent: 0,
    dPrekid: 0,
    nPrekid: 0,
    mPrekid: 0,
    tipGradnje: "",
  });

  const {
    pov,
    zap,
    year,
    name,
    vent,
    dPrekid,
    nPrekid,
    mPrekid,
    tipGradnje,
  } = allValues;

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  return (
    <section className="container">
      <h1 className="large text-primary">Create Your Building</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to create your building
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addBuilding(allValues);
          history.push("buildings");
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name of Building"
            name="name"
            value={name}
            onChange={(e) => changeHandler(e)}
          />
          <small className="form-text">Please enter the name of Building</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Surface"
            name="pov"
            value={pov}
            onChange={(e) => changeHandler(e)}
          />
          <small className="form-text">Please enter surface of Building</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Volume"
            name="zap"
            value={zap}
            onChange={(e) => changeHandler(e)}
          />
          <small className="form-text">Please enter volume of Building</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Year of construction"
            name="year"
            value={year}
            onChange={(e) => changeHandler(e)}
          />
          <small className="form-text">
            Please enter a year of construction
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Ventilation"
            name="vent"
            value={vent}
            onChange={(e) => changeHandler(e)}
          />
          <small className="form-text">
            Please enter a ventilation coeff
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Daily"
            name="dPrekid"
            value={dPrekid}
            onChange={(e) => changeHandler(e)}
          />
          <small className="form-text">
            Please enter a daily downtime
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Weekly"
            name="nPrekid"
            value={nPrekid}
            onChange={(e) => changeHandler(e)}
          />
          <small className="form-text">
            Please enter a weekly downtime
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Monthly"
            name="mPrekid"
            value={mPrekid}
            onChange={(e) => changeHandler(e)}
          />
          <small className="form-text">
            Please enter a seasonal downtime
          </small>
        </div>
        <div className="form-group">
          <select
            name="tipGradnje"
            value={tipGradnje}
            onChange={(e) => changeHandler(e)}
          >
            <option value="0">Type of building</option>
            <option value="Srednji">Srednji</option>
            <option value="Teski">Teski</option>
            <option value="Laki">Laki</option>
          </select>
          <small className="form-text">Choose your type of building</small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to={"/buildings"}>
          Go Back
        </Link>
      </form>
    </section>
  );
};

BuildingForm.propTypes = {
  addBuilding: PropTypes.func.isRequired,
};

export default connect(null, { addBuilding })(BuildingForm);
