import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UnTransElMeas = ({ element, measures }) => {
  const elements = element.map((el) => (
    <tr key={el._id}>
      <td>{el.tip}</td>
      <td>{el.uValue}</td>
      <td>{el.povI + el.povZ + el.povS + el.povJ}</td>
      <td>
        <div className="form-group">
          <select>
            {measures.map((item, index) => {
              if (item.tip === el.tip) {
                return <option key={index}>{item.opis}</option>;
              }
            })}
          </select>
        </div>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">UnTransparent Elements</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Type of Element</th>
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

UnTransElMeas.propTypes = {
  element: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  measures: state.measures.untransMeasures,
});

export default connect(mapStateToProps)(UnTransElMeas);
