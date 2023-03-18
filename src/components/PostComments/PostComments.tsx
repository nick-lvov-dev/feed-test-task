import React, { FC, memo } from "react";
import { Comment } from "../../api/types/Comment";
import "./PostComments.css";
import { PostCommentsComment } from "./Comment/PostCommentsComment";

type Props = {
  isLoading: boolean;
  comments: Comment[];
};

export const PostComments: FC<Props> = memo(function PostComments({
  comments,
  isLoading,
}) {
  return (
    <>
      <h2 className="PostComments__title">Comments</h2>
      <div className="PostComments__wrapper">
        {isLoading ? (
          <span className="PostComments__loading">Loading...</span>
        ) : (
          comments.map((comment) => (
            <PostCommentsComment comment={comment} key={comment.id} />
          ))
        )}
      </div>
    </>
  );
});
