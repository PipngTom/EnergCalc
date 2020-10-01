import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TransElMeas from "./TransElMeas";
import UnTransElMeas from "./UnTransElMeas";

const Package = ({ building }) => {
  return (
    <Fragment>
      <div>{building.name}</div>
      <TransElMeas element={building.trans}></TransElMeas>
      <UnTransElMeas element={building.neTrans}></UnTransElMeas>
    </Fragment>
  );
};

Package.propTypes = {
  building: PropTypes.object.isRequired,
};

export default Package;
