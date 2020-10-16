import {
  ADD_TRANS_MEASURE,
  MEASURES_ERROR,
  GET_ALL_TRANS_MEASURES,
  DELETE_TRANS_MEASURE,
  ADD_UNTRANS_MEASURE,
  GET_ALL_UNTRANS_MEASURES,
  DELETE_UNTRANS_MEASURE,
} from "../actions/types";

const initialState = {
  transMeasures: [],
  transMeasure: null,
  untransMeasures: [],
  untransMeasure: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TRANS_MEASURE:
      return {
        ...state,
        transMeasures: state.transMeasure.map((item) => {
          if (item._id === payload._id) {
            return payload;
          } else {
            return item;
          }
        })
      }
    /*       return {
            ...state,
            transMeasures: [...state.transMeasures, payload],
          }; */
    case ADD_UNTRANS_MEASURE:
      return {
        ...state,
        untransMeasures: state.untransMeasure.map((item) => {
          if (item._id === payload._id) {
            return payload;
          } else {
            return item;
          }
        })
      }
    /*       return {
            ...state,
            untransMeasures: [...state.untransMeasures, payload],
          }; */
    case GET_ALL_TRANS_MEASURES:
      return {
        ...state,
        transMeasures: payload,
        loading: false,
      };
    case GET_ALL_UNTRANS_MEASURES:
      return {
        ...state,
        untransMeasures: payload,
        loading: false,
      };
    case DELETE_TRANS_MEASURE:
      return {
        ...state,
        transMeasures: state.transMeasures.filter(
          (item) => item._id !== payload
        ),
      };
    case DELETE_UNTRANS_MEASURE:
      return {
        ...state,
        untransMeasures: state.untransMeasures.filter(
          (item) => item._id !== payload
        ),
      };
    case MEASURES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
