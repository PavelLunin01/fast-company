import { createSlice } from "@reduxjs/toolkit";
import qualitiesService from "../services/qualitiesService";
import isOutDated from "../utils/isOutDated";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFiled } = actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutDated(lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualitiesService.fetchAll();
      dispatch(qualitiesReceived(content));
    } catch (error) {
      dispatch(qualitiesRequestFiled(error.message));
    }
  }
};

export const getQualities = () => (state) => {
  return state.qualities.entities;
};

export const getQualitiesLoadingStatus = () => (state) => {
  return state.qualities.isLoading;
};

export const getQualitiesById = (qualitiesId) => (state) => {
  if (state.qualities.entities) {
    const qualitiesArray = [];
    for (const qualId of qualitiesId) {
      for (const qual of state.qualities.entities) {
        if (qual._id === qualId) {
          qualitiesArray.push(qual);
          break;
        }
      }
    }
    return qualitiesArray;
  }
  return [];
};

export default qualitiesReducer;
