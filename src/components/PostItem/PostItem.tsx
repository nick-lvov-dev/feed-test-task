import React, { FC, memo } from "react";
import { Post } from "../../api/types/Post";
import "./PostItem.css";

type Props = {
  post: Post;
  authorName: string;
  onClick?: (id: number) => void;
};

export const PostItem: FC<Props> = memo(function Post({
  post,
  authorName,
  onClick,
}) {
  return (
    <button
      className={"Post__button" + (!!onClick ? " Post__button--clickable" : "")}
      onClick={() => onClick?.(post.id)}
    >
      <div className="Post__title">{post.title}</div>
      <div className="Post__author">{authorName}</div>
    </button>
  );
});
