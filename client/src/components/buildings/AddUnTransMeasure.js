import React, { Fragment, useState } from "react";
import { addUnTransMeasure } from "../../actions/measures";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddUnTransMeasure = ({ addUnTransMeasure, history }) => {
  const [formData, setFormData] = useState({
    tip: "",
    opis: "",
    deb: 0,
    lam: 0,
    price: 0,
  });

  const { tip, opis, deb, lam, price } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Intransparent Measure</h1>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addUnTransMeasure(formData);
          history.push("/measures");
        }}
      >
        <div className="form-group">
          <select name="tip" value={tip} onChange={(e) => onChange(e)}>
            <option value="0">* Type of Element</option>
            <option value="Spoljni zid">Spoljni zid</option>
            <option value="Zid prema negrejanom prostoru">
              Zid prema negrejanom prostoru
            </option>
            <option value="Medjuspratna konstrukcija ispod negrejanog prostora">
              Medjuspratna konstrukcija ispod negrejanog prostora
            </option>
            <option value="Medjuspratna konstrukcija iznad negrejanog prostora">
              Medjuspratna konstrukcija iznad negrejanog prostora
            </option>
            <option value="Pod na tlu">Pod na tlu</option>
            <option value="Zid u tlu">Zid u tlu</option>
            <option value="Ravan krov iznad grejanog prostora">
              Ravan krov iznad grejanog prostora
            </option>
            <option value="Kosi krov iznad grejanog prostora">
              Kosi krov iznad grejanog prostora
            </option>
            <option value="Medjuspratna konstrukcija iznad otvorenog prolaza">
              Medjuspratna konstrukcija iznad otvorenog prolaza
            </option>
          </select>
        </div>
        <div className="form-group">
          <h4>Opis</h4>
          <input
            type="text"
            placeholder="* Description"
            value={opis}
            name="opis"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Thickness</h4>
          <input
            type="text"
            placeholder="* Thickness"
            name="deb"
            value={deb}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <h4>Lambda</h4>
          <input
            type="text"
            placeholder="* Lambda"
            name="lam"
            value={lam}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <h4>Price</h4>
          <input
            type="text"
            name="price"
            placeholder="* Price"
            onChange={(e) => onChange(e)}
            value={price}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a
          className="btn btn-light my-1"
          onClick={() => history.push("/measures")}
        >
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddUnTransMeasure.propTypes = {
  addUnTransMeasure: PropTypes.func.isRequired,
};

export default connect(null, { addUnTransMeasure })(AddUnTransMeasure);
