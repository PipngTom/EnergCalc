import axios from "axios";
import {
  ADD_TRANS_MEASURE,
  MEASURES_ERROR,
  GET_ALL_TRANS_MEASURES,
  DELETE_TRANS_MEASURE,
  ADD_UNTRANS_MEASURE,
  GET_ALL_UNTRANS_MEASURES,
  DELETE_UNTRANS_MEASURE,
} from "./types";
import { setAlert } from "./alert";

export const addTransMeasure = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      "/api/measures/measure-trans",
      formData,
      config
    );
    dispatch({
      type: ADD_TRANS_MEASURE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MEASURES_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const addUnTransMeasure = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      "/api/measures/measure-untrans",
      formData,
      config
    );
    dispatch({
      type: ADD_UNTRANS_MEASURE,
      payload: res.data,
    });

  } catch (err) {
    dispatch({
      type: MEASURES_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const getAllTransMes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/measures/measure-trans");

    dispatch({
      type: GET_ALL_TRANS_MEASURES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MEASURES_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const getAllUntransMeas = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/measures/measure-untrans");
    dispatch({
      type: GET_ALL_UNTRANS_MEASURES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MEASURES_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const deleteTransMes = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/measures/measure-trans/${id}`);
    dispatch({
      type: DELETE_TRANS_MEASURE,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: MEASURES_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const deleteUnTransMes = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/measures/measure-untrans/${id}`);
    dispatch({
      type: DELETE_UNTRANS_MEASURE,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: MEASURES_ERROR,
      payload: { msg: err.message },
    });
  }
};
