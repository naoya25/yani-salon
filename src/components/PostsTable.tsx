import React from "react";
import Post from "../types/Post";
import { formatTimestamp } from "../types/utils";

const PostsTable: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <table
      style={{
        margin: "auto",
      }}
    >
      <thead>
        <tr>
          <th>本数</th>
          <th>ユーザー</th>
          <th>日付</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={index}>
            <td>{post.yanis}</td>
            <td>{post.useremail}</td>
            <td>{formatTimestamp(post.timestamp.toDate())}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostsTable;
