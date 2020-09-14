import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBuilding } from '../../actions/buildings';
import { useHistory } from 'react-router-dom';

const BuildingForm = ({ addBuilding }) => {

  const [allValues, setAllValues] = useState({
    pov: 0,
    zap: 0,
    year: 0
  });

  const changeHandler = e => {
    setAllValues({...allValues, [e.target.name]: e.target.value})
  }

  const history = useHistory();
  

  return (
    <div className="post-form">
        <div className="bg-primary p">
          <h3>Create New Building</h3>
        </div>
        <form className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addBuilding(allValues)
          history.push('buildings')
        }}>
          <input type="text" 
          className="btn btn-primary-offline my-1"
          name="pov" 
          onChange={changeHandler}
           />
          <input type="text" 
          className="btn btn-primary-offline my-1"
          name="zap"
          onChange={changeHandler} />
          <input type="text" 
          className="btn btn-primary-offline my-1"
          name="year"
          onChange={changeHandler} />
          <input type="submit" 
          className="btn btn-primary-offline my-1" 
          value="Submit" />
        </form>
      </div>
  )
}

BuildingForm.propTypes = {
  addBuilding: PropTypes.func.isRequired
}

export default connect(null, { addBuilding })(BuildingForm);