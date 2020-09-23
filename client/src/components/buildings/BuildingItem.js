import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteBuilding } from "../../actions/buildings";
import { Link } from "react-router-dom";

const BuildingItem = ({
  deleteBuilding,
  auth,
  building: { user, _id, pov, zap, year, name },
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img
            className="round-img"
            src="https://pixnio.com/free-images/2019/08/10/2019-08-10-08-48-13-1200x800.jpg"
            alt=""
          />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="post-date">Posted on 04/16/2019</p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          <span>4</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/single-building/${_id}`} className="btn btn-primary">
          View Details
        </Link>
        {auth.isAuthenticated && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => deleteBuilding(_id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
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
