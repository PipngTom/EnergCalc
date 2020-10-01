import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const TransElMeas = ({ element, measures }) => {
  const elements = element.map((el) => (
    <tr key={el._id}>
      <td>{el.tip}</td>
      <td>{el.uValue}</td>
      <td>{el.povI + el.povZ + el.povS + el.povJ}</td>
      <td>{el.fFactor}</td>
      <td>
        <select>
          {measures.map((item, index) => {
            if (item.tip === el.tip) {
              return <option key={index}>{item.opis}</option>;
            }
          })}
        </select>
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
            <th className="hide-sm">Surface</th>
            <th>Frame Factor</th>
            <th />
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </Fragment>
  );
};

TransElMeas.propTypes = {
  element: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  measures: state.measures.transMeasures,
});

export default connect(mapStateToProps)(TransElMeas);
