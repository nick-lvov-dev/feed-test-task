import React, { FC, useEffect, useState } from "react";
import { Comment } from "../../api/types/Comment";
import { api } from "../../api/api";
import "./PostDetails.css";
import { PostWithUser } from "../../App";
import { PostComments } from "../PostComments/PostComments";

type Props = {
  post: PostWithUser;
};

export const PostDetails: FC<Props> = ({ post }) => {
  const [areCommentsLoading, setAreCommentsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    api
      .fetchPostComments(post.id)
      .then((comments) => {
        setAreCommentsLoading(false);
        setComments(comments);
      })
      .catch(() => {
        setAreCommentsLoading(false);
        alert("Error loading comments");
      });
  }, [post.id]);

  return (
    <>
      <div className="PostDetails__author">by {post.user.name}</div>
      <div className="PostDetails__text">{post.body}</div>
      <PostComments comments={comments} isLoading={areCommentsLoading} />
    </>
  );
};
