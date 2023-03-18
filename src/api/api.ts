import { Post } from "./types/Post";
import { User } from "./types/User";
import { Comment } from "./types/Comment";

export const api = {
  fetchPosts: () =>
    fetch("https://jsonplaceholder.typicode.com/posts").then(
      (response) => response.json() as Promise<Post[]>,
    ),
  fetchPostComments: (postId: number) =>
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(
      (response) => response.json() as Promise<Comment[]>,
    ),
  fetchUsers: () =>
    fetch("https://jsonplaceholder.typicode.com/users").then(
      (response) => response.json() as Promise<User[]>,
    ),
};
