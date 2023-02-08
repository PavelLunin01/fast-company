import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/commentService";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "./users";

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
      state.entities.push(action.payload);
    },
    commentDeleted: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    }
  }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestedFiled, commentCreated, commentDeleted } = actions;

const addCommentRequested = createAction("comments/addCommentRequested");
const deleteCommentRequested = createAction("comments/deleteCommentRequested");

export const loadCommentsList = (commentsId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(commentsId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestedFiled(error.message));
  }
};

export const createComment = (payload) => async (dispatch, getState) => {
  dispatch(addCommentRequested(payload));
  const comment = {
    ...payload,
    created_at: Date.now(),
    userId: getCurrentUserId()(getState()),
    _id: nanoid()
  };
  try {
    const { content } = await commentService.createComment(comment);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentsRequestedFiled(error.message));
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(deleteCommentRequested());
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
