import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addUnTransparentEl } from "../../actions/buildings";
import { Link } from "react-router-dom";

const AddUnTransparentEl = ({ addUnTransparentEl, match, history }) => {
  const [formData, seFormData] = useState({
    tip: "",
    opis: "",
    uValue: 0,
    povI: 0,
    povZ: 0,
    povS: 0,
    povJ: 0,
  });

  const { tip, opis, uValue, povI, povZ, povS, povJ } = formData;

  const onChange = (e) => {
    seFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Inransparent Element</h1>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addUnTransparentEl(formData, match.params._id, history);
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
        {tip !== "Pod na tlu" && (
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
        )}
        <div className="form-group">
          <h4>{tip !== "Pod na tlu" ? "Surface on West Side" : "Surface"}</h4>
          <input
            type="text"
            name="povZ"
            placeholder="* Surface West"
            onChange={(e) => onChange(e)}
            value={povZ}
          />
        </div>

        {tip !== "Pod na tlu" && (
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
        )}
        {tip !== "Pod na tlu" && (
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
        )}

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

AddUnTransparentEl.propTypes = {
  addUnTransparentEl: PropTypes.func.isRequired,
};

export default connect(null, { addUnTransparentEl })(AddUnTransparentEl);
