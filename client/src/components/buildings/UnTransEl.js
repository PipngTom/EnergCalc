import React, { Fragment } from "react";
import { connect } from "react-redux";
import { deleteUnTransEl } from "../../actions/buildings";
import PropTypes from "prop-types";
import { Semafor } from "./Semafor";

const UnTransEl = ({ element, buildingId, deleteUnTransEl }) => {
  const elements = element.map((el) => (
    <tr key={el._id}>
      <td>{el.tip}</td>
      <td>{el.opis}</td>
      <td
        style={
          Semafor.find((item) => item.name === el.tip).pos <= el.uValue
            ? { backgroundColor: "red" }
            : {}
        }
      >
        {el.uValue}
      </td>
      <td>{el.povI + el.povZ + el.povS + el.povJ}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteUnTransEl(buildingId, el._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Non-Transparent Elements</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Type of Element</th>
            <th>Description</th>
            <th>uValue</th>
            <th className="hide-sm">Surface</th>
            <th />
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </Fragment>
  );
};

UnTransEl.propTypes = {
  element: PropTypes.array.isRequired,
  buildingId: PropTypes.string.isRequired,
  deleteUnTransEl: PropTypes.func.isRequired,
};

export default connect(null, { deleteUnTransEl })(UnTransEl);
