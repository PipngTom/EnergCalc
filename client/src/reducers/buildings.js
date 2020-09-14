import { GET_BUILDINGS, BUILDINGS_ERROR, ADD_BUILDING } from '../actions/types';

const initialState = {
  buildings: [],
  building: null,
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_BUILDINGS:
      return {
        ...state,
        buildings: payload,
        loading: false
      }
    case ADD_BUILDING:
      return {
        ...state,
        buildings: [...state.buildings, payload],
        loading: false
      }
    case BUILDINGS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}