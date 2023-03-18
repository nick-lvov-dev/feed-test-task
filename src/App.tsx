import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Post } from "./api/types/Post";
import { User } from "./api/types/User";
import { api } from "./api/api";
import { PostItem } from "./components/PostItem/PostItem";
import { PostDetails } from "./components/PostDetails/PostDetails";

export type PostWithUser = Post & { user: User };

function App() {
  const [arePostsLoading, setArePostsLoading] = useState(true);
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>();

  useEffect(() => {
    Promise.all([api.fetchPosts(), api.fetchUsers()])
      .then(([posts, users]) => {
        setArePostsLoading(false);
        setPosts(
          posts
            .map((post) => ({
              ...post,
              user: users.find((x) => x.id === post.userId),
            }))
            .filter((x): x is PostWithUser => !!x.user)
            .sort((a, b) => (a.id > b.id ? -1 : a.id < b.id ? 1 : 0)),
        );
      })
      .catch(() => {
        setArePostsLoading(false);
        alert("Error loading post");
      });
  }, []);

  const selectedPost = useMemo(() => {
    return selectedPostId && posts.find((x) => x.id === selectedPostId);
  }, [posts, selectedPostId]);

  return (
    <div className="Posts__container">
      {!!selectedPost && (
        <button
          className="SelectedPost__back"
          onClick={() => setSelectedPostId(undefined)}
        >
          Back
        </button>
      )}
      <h1 className="Posts__title">
        {!!selectedPost ? selectedPost.title : "All posts"}
      </h1>
      {arePostsLoading ? (
        <span className="Posts__loading">Loading...</span>
      ) : !selectedPost ? (
        <div className="Posts__wrapper">
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              authorName={post.user.name}
              onClick={setSelectedPostId}
            />
          ))}
        </div>
      ) : (
        <PostDetails post={selectedPost} />
      )}
    </div>
  );
}

export default App;
