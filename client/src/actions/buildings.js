import axios from 'axios';
import { setAlert } from './alert';
import { GET_BUILDINGS, BUILDINGS_ERROR, ADD_BUILDING } from './types';

export const getBuildings = () => async dispatch => {
  try {
    const res = await axios.get('/api/buildings/me')

    dispatch({
      type: GET_BUILDINGS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BUILDINGS_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

export const addBuilding = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/buildings/me', formData, config);

    dispatch({
      type: ADD_BUILDING,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BUILDINGS_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}