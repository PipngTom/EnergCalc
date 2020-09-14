import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBuildings } from '../../actions/buildings';
import BuildingItem from './BuildingItem';
import { Redirect, useHistory } from 'react-router-dom';

const Buildings = ({getBuildings, buildings: {buildings, loading}}) => {
  useEffect(() => {
    getBuildings()
  }, [getBuildings])
  
  const history = useHistory();
  const navigateToForm = () => {
    history.push('new-building');
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Buildings</h1>
      <p className="lead">
        <i className="fas fa-calculator"></i>
        Welcome to EnergCalc
      </p>
      <button type="button" onClick={navigateToForm}>Create New Building</button>
      <div className="posts">
        {buildings.map(build => (
          <BuildingItem key={build._id} building={build}/>
        ))}
      </div>
    </Fragment>
  )
}

Buildings.propTypes = {
  getBuildings: PropTypes.func.isRequired,
  buildings: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  buildings: state.buildings
})

export default connect(mapStateToProps, {getBuildings})(Buildings);