import React from "react";
import { formatTimestamp } from "../types/utils";
import usePosts from "./usePosts";

const PostsTable: React.FC = () => {
  const { myposts } = usePosts();
  return (
    <table
      style={{
        margin: "auto",
      }}
    >
      <thead>
        <tr>
          <th>銘柄</th>
          <th>タール</th>
          <th>本数</th>
          <th>日付</th>
        </tr>
      </thead>
      <tbody>
        {myposts.map((post, index) => (
          <tr key={index}>
            <td>{post.tobaccoBrand}</td>
            <td>{post.tar}</td>
            <td>{post.yanis}</td>
            <td>{formatTimestamp(post.timestamp.toDate())}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostsTable;