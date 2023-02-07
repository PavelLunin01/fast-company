import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/commentService";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      state.isLoading = false;
      state.entities.push(action.payload);
    },
    commentDeleted: (state, action) => {
      state.isLoading = false;
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    }
  }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestedFiled, commentCreated, commentDeleted } = actions;

export const loadCommentsList = (commentsId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(commentsId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestedFiled(error.message));
  }
};

export const createComment = (payload) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.createComment(payload);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentsRequestedFiled(error.message));
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.removeComments(commentId);
    if (content === null) {
      dispatch(commentDeleted(commentId));
    }
  } catch (error) {
    dispatch(commentsRequestedFiled(error.message));
  }
};

export const getComments = () => (state) => {
  return state.comments.entities;
};

export const getCommentsLoadingStatus = () => (state) => {
  return state.comments.isLoading;
};

export default commentsReducer;
