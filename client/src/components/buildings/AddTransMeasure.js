import React, { Fragment, useState } from "react";
import { addTransMeasure } from "../../actions/measures";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddTransMeasure = ({ addTransMeasure, history }) => {
  const [formData, setFormData] = useState({
    tip: "",
    opis: "",
    uValue: 0,
    price: 0,
  });

  const { tip, opis, uValue, price } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Transparent Measure</h1>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addTransMeasure(formData);
          history.push("/measures");
        }}
      >
        <div className="form-group">
          <select name="tip" value={tip} onChange={(e) => onChange(e)}>
            <option value="0">* Type of Element</option>
            <option value="Prozor">Prozor</option>
            <option value="Vrata">Vrata</option>
            <option value="Balkonska vrata">Balkonska Vrata</option>
            <option value="Vrata sa staklom">Vrata sa staklom</option>
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
          <h4>
            uValue [W/m<sup>2</sup>K]
          </h4>
          <input
            type="text"
            placeholder="* uValue"
            name="uValue"
            value={uValue}
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

AddTransMeasure.propTypes = {
  addTransMeasure: PropTypes.func.isRequired,
};

export default connect(null, { addTransMeasure })(AddTransMeasure);
