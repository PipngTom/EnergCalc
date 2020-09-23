import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBuilding } from "../../actions/buildings";
import { useHistory } from "react-router-dom";

const BuildingForm = ({ addBuilding }) => {
  const [allValues, setAllValues] = useState({
    pov: 0,
    zap: 0,
    year: 0,
    name: "",
  });

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  return (
    <section className="container">
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(allValues);
          addBuilding(allValues);
          history.push("buildings");
        }}
      >
        {/* <div className="form-group">
          <select name="status">
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div> */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Name of Building"
            name="name"
            onChange={changeHandler}
          />
          <small className="form-text">Please enter the name of Building</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Surface"
            name="pov"
            onChange={changeHandler}
          />
          <small className="form-text">Please enter surface of Building</small>
        </div>
        {/* <div className="form-group">
          <input type="text" placeholder="Location" name="location" />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div> */}
        <div className="form-group">
          <input
            type="text"
            placeholder="* Volume"
            name="zap"
            onChange={changeHandler}
          />
          <small className="form-text">Please enter volume of Building</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Year of construction"
            name="year"
            onChange={changeHandler}
          />
          <small className="form-text">
            Please enter a year of construction
          </small>
        </div>
        {/* <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio"></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div> */}

        {/* <div className="my-2">
          <button type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" />
        </div> */}
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </section>
  );
};

BuildingForm.propTypes = {
  addBuilding: PropTypes.func.isRequired,
};

export default connect(null, { addBuilding })(BuildingForm);
