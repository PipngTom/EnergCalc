import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteBuilding } from "../../actions/buildings";
import { Link } from "react-router-dom";
import { enerCalc } from "./enerCalc";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const BuildingItem = ({ deleteBuilding, auth, building }) => {
  //const Qhint = enerCalc(building).Qhint;
  //const klasa = enerCalc(building).klasa;
  const { Qhint, klasa } = enerCalc(building);
  return (
    <Fragment>
      <div className="col-md-6 col-lg-4">
        <Card>
          <Card.Img
            variant="top"
            src={building.image ? `http://localhost:5000/${building.image}` : "https://pixnio.com/free-images/2019/08/10/2019-08-10-08-48-13-1200x800.jpg"}
          />
          <Card.Body>
            <Card.Title>{building && building.name}</Card.Title>
            <div>
              <p>Qhnd: {building && Qhint.toFixed(2)} kWh</p>
              <p>
                Qhnd,rel: {building && (Qhint / building.pov).toFixed(2)} kWh/m
                <sup>2</sup>a
              </p>
              <p>Class: {klasa}</p>
            </div>
            <Link
              to={`/single-building/${building._id}`}
              className="btn btn-primary"
            >
              View Details
            </Link>
            {auth.isAuthenticated && (
              <Button
                variant="primary"
                className="btn btn-danger"
                onClick={(e) => deleteBuilding(building._id)}
              >
                <i className="fas fa-times"></i>
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};

BuildingItem.propTypes = {
  building: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteBuilding: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteBuilding })(BuildingItem);
