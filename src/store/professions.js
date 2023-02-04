import { createSlice } from "@reduxjs/toolkit";
import { isOutDated } from "./qualities";
import professionsService from "../services/professionsService";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFiled: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionsRequested, professionsReceived, qualitiesRequestFiled } = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions;
  if (isOutDated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionsService.fetchAll();
      dispatch(professionsReceived(content));
    } catch (error) {
      dispatch(qualitiesRequestFiled(error.message));
    }
  }
};

export const getProfessionById = (professionsId) => (state) => {
  if (state.professions.entities) {
    const professionsArray = state.professions.entities;
    return professionsArray.find((p) => p._id === professionsId);
  }
  return [];
};

export const getProfessions = () => (state) => {
  return state.professions.entities;
};

export const getProfessionsLoadingStatus = () => (state) => {
  return state.professions.isLoading;
};

export default professionsReducer;
