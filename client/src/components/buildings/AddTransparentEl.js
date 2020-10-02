import React, { Fragment, useState } from "react";
import { addTransparentEl } from "../../actions/buildings";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AddTransparentEl = ({ addTransparentEl, history, match }) => {
  const [formData, setFormData] = useState({
    tip: "",
    opis: "",
    uValue: 0,
    povI: 0,
    povZ: 0,
    povS: 0,
    povJ: 0,
    fFactor: 0,
    g: 0,
  });

  const { tip, opis, uValue, povI, povZ, povS, povJ, fFactor, g } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Transparent Element</h1>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addTransparentEl(formData, match.params._id, history);
        }}
      >
        <div className="form-group">
          <select
            name="status"
            name="tip"
            value={tip}
            onChange={(e) => onChange(e)}
          >
            <option value="0">* Type of Element</option>
            <option value="Prozor">Prozor</option>
            <option value="Vrata">Vrata</option>
            <option value="Balkonska vrata">Balkonska Vrata</option>
            <option value="Vrata sa staklom">Vrata sa staklom</option>
          </select>
        </div>
        <div className="form-group">
          <h4>Description</h4>
          <input
            type="text"
            placeholder="* Description"
            name="opis"
            value={opis}
            onChange={(e) => onChange(e)}
            required
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
          <h4>Surface on East Side</h4>
          <input
            type="text"
            placeholder="* Surface East"
            value={povI}
            name="povI"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Surface on West Side</h4>
          <input
            type="text"
            name="povZ"
            placeholder="* Surface West"
            onChange={(e) => onChange(e)}
            value={povZ}
          />
        </div>
        <div className="form-group">
          <h4>Surface on North Side</h4>
          <input
            type="text"
            name="povS"
            placeholder="* Surface North"
            onChange={(e) => onChange(e)}
            value={povS}
          />
        </div>
        <div className="form-group">
          <h4>Surface on South Side</h4>
          <input
            type="text"
            name="povJ"
            placeholder="* Surface South"
            onChange={(e) => onChange(e)}
            value={povJ}
          />
        </div>
        <div className="form-group">
          <h4>Frame Factor</h4>
          <input
            type="text"
            placeholder="* Frame Factor"
            name="fFactor"
            onChange={(e) => onChange(e)}
            value={fFactor}
          />
        </div>
        <div className="form-group">
          <h4>gValue</h4>
          <input
            type="text"
            placeholder="* gValue"
            name="g"
            onChange={(e) => onChange(e)}
            value={g}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link
          className="btn btn-light my-1"
          to={`/single-building/${match.params._id}`}
        >
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddTransparentEl.propTypes = {
  addTransparentEl: PropTypes.func.isRequired,
};

export default connect(null, { addTransparentEl })(AddTransparentEl);
