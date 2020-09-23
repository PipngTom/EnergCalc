import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteTransEl } from "../../actions/buildings";

const TransEl = ({ element, buildingId, deleteTransEl }) => {
  const elements = element.map((el) => (
    <tr key={el._id}>
      <td>{el.tip}</td>
      <td>{el.uValue}</td>
      <td>{el.povI}</td>
      <td>{el.povZ}</td>
      <td>{el.povS}</td>
      <td>{el.povJ}</td>
      <td>{el.fFactor}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteTransEl(buildingId, el._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Transparent Elements</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Type of Element</th>
            <th>uValue</th>
            <th className="hide-sm">Surface E</th>
            <th className="hide-sm">Surface W</th>
            <th className="hide-sm">Surface N</th>
            <th className="hide-sm">Surface S</th>
            <th>Frame Factor</th>
            <th />
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </Fragment>
  );
};

TransEl.propTypes = {
  element: PropTypes.array.isRequired,
  buildingId: PropTypes.string.isRequired,
  deleteTransEl: PropTypes.func.isRequired,
};

export default connect(null, { deleteTransEl })(TransEl);
