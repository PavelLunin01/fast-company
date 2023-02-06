import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import commentService from "../services/commentService";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();
export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { userId } = useParams();
  const [error, setError] = useState(null);
  const currentUserId = useSelector(getCurrentUserId());
  useEffect(() => {
    getComments();
  }, [userId]);

  async function createComment(data) {
    const comment = {
      ...data,
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId,
      _id: nanoid()
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }
  };
  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  };
  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComments(id);
      if (content === null) {
        setComments((prevState) => (
          prevState.filter((c) => c._id !== id)
        ));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  };

  return <CommentsContext.Provider value={{ comments, createComment, isLoading, removeComment }}>{children}</CommentsContext.Provider>;
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
