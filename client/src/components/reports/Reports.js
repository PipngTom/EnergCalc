import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllBuildings, getBuildings } from "../../actions/buildings";
import { getAllTransMes, getAllUntransMeas } from "../../actions/measures";
import { enerCalc } from "../buildings/enerCalc";
import PackageRep from "./PackageRep";

const Reports = ({
    getBuildings,
    getAllBuildings,
    getAllTransMes,
    getAllUntransMeas,
    auth,
    buildings: { buildings, loading },
}) => {

    const [packageNum, setPackagenum] = useState(1);
    useEffect(() => {
        if (auth.isAuthenticated) {
            getBuildings();
            getAllTransMes();
            getAllUntransMeas();
            setPackagenum(1);
        } else {
            getAllBuildings();
        }
    }, [getBuildings, auth]);

    const changeHandler = (e) => {
        setPackagenum(e.target.value);
    };

    const elements = buildings.map((el) => (
        <tr key={el._id + packageNum}>
            <td>{el.name}</td>
            <td>{el.pov}</td>
            <td>{enerCalc(el).Qhint.toFixed(0)}</td>
            <td>{enerCalc(el).klasa}</td>
            <PackageRep key={el._id} building={el} packageNum={parseInt(packageNum)} izv={true}></PackageRep>
        </tr>
    ));

    return (
        <Fragment>
            <h1 className="large text-primary">Buildings</h1>
            <select
                onChange={(e) => changeHandler(e)}
            >
                <option value="1">Paket 1</option>
                <option value="2">Paket 2</option>
                <option value="3">Paket 3</option>
                <option value="4">Paket 4</option>
                <option value="5">Paket 5</option>
            </select>
            <table className="table">
                <thead>
                    <tr>
                        <th>Naziv objekta</th>
                        <th>Povrsina</th>
                        <th className="hide-sm">Qhnd [kWh]</th>
                        <th className="hide-sm">Klasa</th>
                        <th className="hide-sm">Usteda u paketu {packageNum} [kWh]</th>
                        <th className="hide-sm">Usteda u paketu {packageNum} [EUR]</th>
                        <th className="hide-sm">Klasa u paketu {packageNum}</th>
                        <th className="hide-sm">Investicija za paket {packageNum} [EUR]</th>
                        <th className="hide-sm">Period povrata za paket {packageNum} [GOD]</th>
                    </tr>
                </thead>
                <tbody>{elements}</tbody>
            </table>
        </Fragment>
    );
};

Reports.propTypes = {
    getBuildings: PropTypes.func.isRequired,
    getAllBuildings: PropTypes.func.isRequired,
    getAllTransMes: PropTypes.func.isRequired,
    getAllUntransMeas: PropTypes.func.isRequired,
    buildings: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    buildings: state.buildings,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getBuildings, getAllBuildings, getAllTransMes,
    getAllUntransMeas
})(
    Reports
);
