import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBuilding, getSingleBuilding } from "../../actions/buildings";
import { useHistory, Link } from "react-router-dom";
import buildings from "../../reducers/buildings";

const EditBuilding = ({ addBuilding, buildings: { building }, match }) => {
    const [allValues, setAllValues] = useState({
        _id: building._id,
        pov: building.pov,
        zap: building.zap,
        year: building.year,
        name: building.name,
        vent: building.vent,
        dPrekid: building.dPrekid,
        nPrekid: building.nPrekid,
        mPrekid: building.mPrekid,
        tipGradnje: building.tipGradnje
        /*         pov: 0,
                zap: 0,
                year: 0,
                name: "",
                vent: 0,
                dPrekid: 0,
                nPrekid: 0,
                mPrekid: 0,
                tipGradnje: "", */
    });
    /*     useEffect(() => {
            getSingleBuilding(match.params._id);
        }, []); */

    /*     useEffect(() => {
    
            console.log(building)
            if (building) {
                setAllValues({
                    pov: building.pov,
                    zap: building.zap,
                    year: building.year,
                    name: building.name,
                    vent: building.vent,
                    dPrekid: building.dPrekid,
                    nPrekid: building.nPrekid,
                    mPrekid: building.mPrekid,
                    tipGradnje: building.tipGradnje
                });
            }
        }, [building]); */

    const {
        pov,
        image,
        zap,
        year,
        name,
        vent,
        dPrekid,
        nPrekid,
        mPrekid,
        tipGradnje,
    } = allValues;

    //  console.log(building);

    const changeHandler = (e) => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    };

    const pickedHandler = (event) => {
        console.log(event.target.files[0]);
        setAllValues({ ...allValues, image: event.target.files[0] });
    };

    const history = useHistory();

    return (
        <section className="container">
            <h1 className="large text-primary">Edit Your Building</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to edit your building
      </p>
            <small>* = required field</small>
            {building && (<form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    var formData = new FormData();
                    formData.append("_id", building._id);
                    formData.append("pov", pov);
                    formData.append("image", image);
                    formData.append("zap", zap);
                    formData.append("year", year);
                    formData.append("name", name);
                    formData.append("vent", vent);
                    formData.append("dPrekid", dPrekid);
                    formData.append("nPrekid", nPrekid);
                    formData.append("mPrekid", mPrekid);
                    formData.append("tipGradnje", tipGradnje);
                    addBuilding(formData);
                    history.push("/buildings");
                }}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name of Building"
                        name="name"
                        value={name}
                        onChange={(e) => changeHandler(e)}
                    />
                    <small className="form-text">Please enter the name of Building</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Surface"
                        name="pov"
                        value={pov}
                        onChange={(e) => changeHandler(e)}
                    />
                    <small className="form-text">Please enter surface of Building</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Volume"
                        name="zap"
                        value={zap}
                        onChange={(e) => changeHandler(e)}
                    />
                    <small className="form-text">Please enter volume of Building</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Year of construction"
                        name="year"
                        value={year}
                        onChange={(e) => changeHandler(e)}
                    />
                    <small className="form-text">
                        Please enter a year of construction
          </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Ventilation"
                        name="vent"
                        value={vent}
                        onChange={(e) => changeHandler(e)}
                    />
                    <small className="form-text">
                        Please enter a ventilation coeff
          </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Daily"
                        name="dPrekid"
                        value={dPrekid}
                        onChange={(e) => changeHandler(e)}
                    />
                    <small className="form-text">
                        Please enter a daily downtime
          </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Weekly"
                        name="nPrekid"
                        value={nPrekid}
                        onChange={(e) => changeHandler(e)}
                    />
                    <small className="form-text">
                        Please enter a weekly downtime
          </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Monthly"
                        name="mPrekid"
                        value={mPrekid}
                        onChange={(e) => changeHandler(e)}
                    />
                    <small className="form-text">
                        Please enter a seasonal downtime
          </small>
                </div>
                <div className="form-group">
                    <select
                        name="tipGradnje"
                        value={tipGradnje}
                        onChange={(e) => changeHandler(e)}
                    >
                        <option value="0">Type of building</option>
                        <option value="Srednji">Srednji</option>
                        <option value="Teski">Teski</option>
                        <option value="Laki">Laki</option>
                    </select>
                    <small className="form-text">Choose your type of building</small>
                </div>
                <input


                    //style={{ display: 'none' }}
                    type="file"
                    accept=".jpg,.png,.jpeg"
                    onChange={pickedHandler}
                />
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to={"/buildings"}>
                    Go Back
        </Link>
            </form>)}
        </section>
    );
};

EditBuilding.propTypes = {
    addBuilding: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    buildings: state.buildings,
});

export default connect(mapStateToProps, { addBuilding })(EditBuilding);
