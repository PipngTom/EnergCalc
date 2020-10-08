import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Semafor } from "./Semafor";

const TransElMeas = ({ element, measures, getSum, getUvalues, getIdpairs }) => {
  const [newValues, setNewValues] = useState(
    element.map((item) => item.uValue)
  );
  const [Idpairs, setIdpairs] = useState(
    element.map((item) => {
      return { idEl: item._id, idMeas: 0 };
    })
  );
  const [newPrices, setNewPrices] = useState(element.map((item) => 0));
  const [sum, setSum] = useState(0);
  useEffect(() => {
    let sumFor = 0;
    for (let i = 0; i < newPrices.length; i++) {
      sumFor +=
        newPrices[i] *
        (element[i].povI + element[i].povZ + element[i].povJ + element[i].povS);
    }
    setSum(sumFor);
    getSum(sumFor);
    getIdpairs(Idpairs);
    getUvalues(newValues, "TR");
  }, [newPrices]);

  const onChange = (e, elIndex) => {
    setIdpairs(
      element.map((item, index) => {
        if (index === elIndex && e.target.value === "k") {
          return {
            idEl: item._id,
            idMeas: 0,
          };
        }
        if (index === elIndex && e.target.value !== "k") {
          return {
            idEl: item._id,
            idMeas: measures[e.target.value]._id,
          };
        } else {
          return {
            idEl: Idpairs[index].idEl,
            idMeas: Idpairs[index].idMeas,
          };
        }
      })
    );
    setNewValues(
      newValues.map((item, index) => {
        if (index === elIndex && e.target.value === "k") {
          return element[index].uValue;
        }
        if (index === elIndex && e.target.value !== "k") {
          return measures[e.target.value].uValue;
        } else {
          return item;
        }
      })
    );
    setNewPrices(
      newPrices.map((item, index) => {
        if (index === elIndex && e.target.value === "k") {
          return 0;
        }
        if (index === elIndex && e.target.value !== "k") {
          return measures[e.target.value].price;
        } else {
          return item;
        }
      })
    );
    console.log(newPrices);

    //    setSum(sumFor);

    //    console.log(sumFor, sum);
  };
  const elements = element.map((el, elIndex) => (
    <tr key={el._id}>
      <td>{el.tip}</td>
      <td>{el.opis}</td>
      <td>{el.uValue}</td>
      <td>{el.povI + el.povZ + el.povS + el.povJ}</td>
      <td>
        <select onChange={(e) => onChange(e, elIndex)} >
          <option value="k">* Select measure</option>
          {measures.map((item, index) => {
            if (item.tip === el.tip) {
              return (
                <option key={index} value={index}>
                  {item.opis}
                </option>
              );
            }
          })}
        </select>
      </td>
      <td
        style={
          Semafor.find((item) => item.name === el.tip).pos <= newValues[elIndex]
            ? { backgroundColor: "red" }
            : {}
        }
      >
        {newValues[elIndex]}
      </td>
      <td>{newPrices[elIndex] * (el.povI + el.povZ + el.povS + el.povJ)}</td>
    </tr>
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
            <th>Measure selection</th>
            <th>new Uvalue</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {elements}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <b>Ukupno:</b>
            </td>
            <td>{sum}</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

TransElMeas.propTypes = {
  element: PropTypes.array.isRequired,
  getSum: PropTypes.func.isRequired,
  getUvalues: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  measures: state.measures.transMeasures,
});

export default connect(mapStateToProps)(TransElMeas);
