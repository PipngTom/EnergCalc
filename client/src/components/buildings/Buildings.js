import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllBuildings, getBuildings } from "../../actions/buildings";
import { getAllTransMes, getAllUntransMeas } from "../../actions/measures";
import BuildingItem from "./BuildingItem";
import { useHistory } from "react-router-dom";

const Buildings = ({
  getBuildings,
  getAllBuildings,
  getAllTransMes,
  getAllUntransMeas,
  auth,
  buildings: { buildings, loading },
}) => {
  useEffect(() => {
    if (auth.isAuthenticated) {
      getBuildings();
      getAllTransMes();
      getAllUntransMeas();
    } else {
      getAllBuildings();
    }
  }, [getBuildings, auth]);

  const history = useHistory();
  const navigateToForm = () => {
    history.push("new-building");
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Buildings</h1>
      <p className="lead">
        <i className="fas fa-calculator"></i>
        Welcome to EnergCalc
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={navigateToForm}
      >
        Create New Building
      </button>
      <div className="posts d-flex flex-wrap">
        <div className="row">
          {buildings.map((build) => (
            <BuildingItem key={build._id} building={build} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Buildings.propTypes = {
  getBuildings: PropTypes.func.isRequired,
  getAllBuildings: PropTypes.func.isRequired,
  getAllTransMes: PropTypes.func.isRequired,
  getAllUntransMeas: PropTypes.func.isRequired,
  buildings: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  buildings: state.buildings,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getBuildings, getAllBuildings, getAllTransMes,
  getAllUntransMeas
})(
  Buildings
);
