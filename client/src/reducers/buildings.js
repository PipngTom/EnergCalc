import {
  GET_BUILDINGS,
  BUILDINGS_ERROR,
  ADD_BUILDING,
  DELETE_BUILDING,
  GET_SINGLE_BUILDING,
  CLEAR_SINGLE_BUILDING,
  UPDATE_BUILDING,
  ADD_MEASURES_ARRAY
} from "../actions/types";

const initialState = {
  buildings: [],
  measures: [],
  building: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BUILDINGS:
      return {
        ...state,
        buildings: payload,
        loading: false,
      };
    case GET_SINGLE_BUILDING:
    case UPDATE_BUILDING:
      return {
        ...state,
        building: { ...payload },
      };
    case ADD_BUILDING:
      return {
        ...state,
        buildings: [...state.buildings, payload],
        loading: false,
      };
    case DELETE_BUILDING:
      return {
        ...state,
        buildings: state.buildings.filter((item) => item._id !== payload),
      };
    case BUILDINGS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_SINGLE_BUILDING:
      return {
        ...state,
        building: null,
        measures: []
      };
    case ADD_MEASURES_ARRAY:
      let arr;
      if (state.measures.findIndex((item) => item.num === payload.num) === -1) {
        arr = [...state.measures, payload]
      } else {
        arr = state.measures.map((item) => {
          if (item.num === payload.num) {
            return {
              arrTrans: payload.arrTrans,
              arrUnTrans: payload.arrUnTrans,
              num: payload.num
            }
          } else return item;
        })
      }
      return {
        ...state,
        measures: arr

      };
    default:
      return state;
  }
}
