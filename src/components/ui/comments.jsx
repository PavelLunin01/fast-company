import React, { useEffect } from "react";
import { orderBy } from "lodash";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());
  const currentUserId = useSelector(getCurrentUserId());
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const handleSubmit = (data) => {
    const comment = {
      ...data,
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId,
      _id: nanoid()
    };
    dispatch(createComment(comment));
  };

  const handleRemoveComment = (id) => {
    dispatch(deleteComment(id));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr/>
            {!isLoading ? (
              <CommentsList comments={sortedComments} onRemove={handleRemoveComment}/>
            ) : "Loading..."}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
