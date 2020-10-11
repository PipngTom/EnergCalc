import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllTransMes, getAllUntransMeas } from "../../actions/measures";
import TransMeas from "./TransMeas";
import UnTransMeas from "./UnTransMeas";

const Measures = ({
  getAllTransMes,
  getAllUntransMeas,
  measures,
  unTransmes,
}) => {
  useEffect(() => {
    getAllTransMes();
    getAllUntransMeas();
  }, [getAllTransMes, getAllUntransMeas]);

  return (
    <div>
      <Link to={"/add-trans-measure"} className="btn btn-light">
        <i className="far fa-home text-primary"></i> Add New Transparent Measure
      </Link>
      <Link to={"/add-untrans-measure"} className="btn btn-light">
        <i className="fas fa-home text-primary"></i> Add New Non-Transparent
        Measure
      </Link>
      {measures && <TransMeas element={measures}></TransMeas>}
      {unTransmes && <UnTransMeas element={unTransmes}></UnTransMeas>}
    </div>
  );
};

Measures.propTypes = {
  getAllTransMes: PropTypes.func.isRequired,
  getAllUntransMeas: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  measures: state.measures.transMeasures,
  unTransmes: state.measures.untransMeasures,
});

export default connect(mapStateToProps, { getAllTransMes, getAllUntransMeas })(
  Measures
);
