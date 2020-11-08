import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteTransEl } from "../../actions/buildings";
import { Semafor } from "./Semafor";

const TransEl = ({ element, buildingId, deleteTransEl }) => {
  const elements = element.map((el) => (
    <tr key={el._id}>
      <td>{el.tip}</td>
      <td>{el.opis}</td>
      <td
        className={
          Semafor.find((item) => item.name === el.tip).pos <= el.uValue
            ? "semafor"
            : {}
        }
      >
        {el.uValue}
      </td>
      <td>{(el.povI + el.povZ + el.povS + el.povJ).toFixed(2)}</td>
      <td>{el.fFactor}</td>
      <td>{el.g}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteTransEl(buildingId, el._id)}
        >
          Delete
        </button>
      </td>
    </tr >
  ));

  return (
    <Fragment>
      <h2 className="my-2">Transparent Elements</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Type of Element</th>
            <th>Description</th>
            <th>uValue</th>
            <th className="hide-sm">Surface</th>
            <th>Frame Factor</th>
            <th>gValue</th>
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
