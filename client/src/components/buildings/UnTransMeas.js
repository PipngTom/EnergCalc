import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteUnTransMes } from "../../actions/measures";
import { useHistory } from "react-router-dom";

const UnTransMeas = ({ element, deleteUnTransMes }) => {

  const history = useHistory();
  const elements = element
    .sort((a, b) => {
      if (a.tip < b.tip) {
        return -1;
      }
      if (a.tip > b.tip) {
        return 1;
      }
      return 0;
    })
    .map((el) => (
      <tr key={el._id + Math.floor(Math.random() * 1000)}>
        <td>{el.tip}</td>
        <td>{el.opis}</td>
        <td>{el.deb}</td>
        <td>{el.lam}</td>
        <td>{el.price}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteUnTransMes(el._id)}
          >
            Delete
          </button>
        </td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => { console.log(el._id); history.push("/edit-untrans/" + el._id); }}
          >
            Edit
          </button>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      <h2 className="my-2">Non-Transparent Measures</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Type of Element</th>
            <th>Description</th>
            <th className="hide-sm">Thickness</th>
            <th className="hide-sm">Lambda</th>
            <th className="hide-sm">Price</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </Fragment>
  );
};

UnTransMeas.propTypes = {
  element: PropTypes.array.isRequired,
  deleteUnTransMes: PropTypes.func.isRequired,
};

export default connect(null, { deleteUnTransMes })(UnTransMeas);
