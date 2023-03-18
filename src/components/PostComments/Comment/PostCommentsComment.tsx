import React, { FC } from "react";
import { Comment } from "../../../api/types/Comment";
import "./PostCommentsComment.css";

type Props = {
  comment: Comment;
};

export const PostCommentsComment: FC<Props> = ({ comment }) => {
  return (
    <div className="PostCommentsComment__container">
      <div className="PostCommentsComment__title">{comment.name}</div>
      <div className="PostCommentsComment__body">{comment.body}</div>
      <div className="PostCommentsComment__author">{comment.email}</div>
    </div>
  );
};
