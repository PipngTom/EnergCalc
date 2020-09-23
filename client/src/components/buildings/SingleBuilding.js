import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {
  getSingleBuilding,
  clearSingleBuilding,
} from "../../actions/buildings";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TransEl from "./TransEl";

const SingleBuilding = ({
  getSingleBuilding,
  clearSingleBuilding,
  match,
  buildings: { building },
}) => {
  useEffect(() => {
    getSingleBuilding(match.params._id);
    return () => {
      clearSingleBuilding();
    };
  }, [getSingleBuilding]);

  return (
    <Fragment>
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Building details</h2>
        <div>
          <p className="text-dark">
            <strong>Year of construction:</strong>
            {building && building.year}
          </p>
          <p>
            <strong>Name: </strong>
            {building && building.name}
          </p>
        </div>
        <div>
          <p>
            <strong>Surface: </strong> {building && building.pov} m<sup>2</sup>
          </p>
          <p>
            <strong>Volume: </strong>
            {building && building.zap} m<sup>3</sup>
          </p>
        </div>
      </div>
      <div className="dash-buttons">
        <Link to="/edit-building" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Building
        </Link>
        <Link
          to={`/add-transparent/${match.params._id}`}
          className="btn btn-light"
        >
          <i className="fab fa-black-tie text-primary"></i> Add Transparent
          Element
        </Link>
        <Link to="/add-untransparent" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Add
          Untransparent Element
        </Link>
      </div>
      {building && (
        <TransEl element={building.trans} buildingId={building._id}></TransEl>
      )}
    </Fragment>
  );
};

SingleBuilding.propTypes = {
  getSingleBuilding: PropTypes.func.isRequired,
  clearSingleBuilding: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buildings: state.buildings,
});

export default connect(mapStateToProps, {
  getSingleBuilding,
  clearSingleBuilding,
})(SingleBuilding);
