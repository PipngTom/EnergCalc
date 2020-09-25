import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addUnTransparentEl } from "../../actions/buildings";

const AddUnTransparentEl = ({ addUnTransparentEl, match, history }) => {
  const [formData, seFormData] = useState({
    tip: "",
    uValue: 0,
    povI: 0,
    povZ: 0,
    povS: 0,
    povJ: 0,
  });

  const { tip, uValue, povI, povZ, povS, povJ } = formData;

  const onChange = (e) => {
    seFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An UnTransparent Element</h1>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addUnTransparentEl(formData, match.params._id, history);
        }}
      >
        <div className="form-group">
          <h4>Type of Element</h4>
          <input
            type="text"
            placeholder="* Type of Element"
            onChange={(e) => onChange(e)}
            name="tip"
            value={tip}
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
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddUnTransparentEl.propTypes = {
  addUnTransparentEl: PropTypes.func.isRequired,
};

export default connect(null, { addUnTransparentEl })(AddUnTransparentEl);
