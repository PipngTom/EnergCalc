import {
  GET_BUILDINGS,
  BUILDINGS_ERROR,
  ADD_BUILDING,
  DELETE_BUILDING,
  GET_SINGLE_BUILDING,
  CLEAR_SINGLE_BUILDING,
  UPDATE_BUILDING,
  ADD_MEASURES_ARRAY,
  SET_VENT,
  CLEAR_MEASURES_ARRAY,
  CLEAR_VENT_ARRAY
} from "../actions/types";

const initialState = {
  vent: [],
  buildings: [],
  measures: [],
  building: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_VENT:
      let arrVent;
      if (state.vent.findIndex((item) => item.packageNum === payload.packageNum) === -1) {
        arrVent = [...state.vent, payload]
      } else {
        arrVent = state.vent.map((item) => {
          if (item.packageNum === payload.packageNum) {
            return {
              ven: payload.ven,
              packageNum: payload.packageNum
            }
          } else return item;
        })
      }
      return {
        ...state,
        vent: arrVent

      };
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
    case CLEAR_MEASURES_ARRAY:
      return {
        ...state,
        measures: []
      };
    case CLEAR_VENT_ARRAY:
      return {
        ...state,
        vent: []
      };
    case ADD_MEASURES_ARRAY:
      let arr;
      if (state.measures.findIndex((item) => item.num === payload.num) === -1) {
        arr = [...state.measures, payload] //ako je novootvoreni paket ubacuje se u state
      } else {
        arr = state.measures.map((item) => { //ako je postojeći traži ga po broju i ažurira mu mere
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
