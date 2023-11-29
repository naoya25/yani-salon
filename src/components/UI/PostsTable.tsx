import React, { useState } from "react";
import { formatTimestamp } from "../../utils/formatTimestamp";
import Post from "../../types/post";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import useAuth from "../../hooks/useAuth";

const PostsTable: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const currentUser = useAuth();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const handlePostDelete = async (postId: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, "Posts", postId));
    } catch (e) {
      setErrorMsg(`Error adding document: ${e}`);
    }
  };
  return (
    <table style={{ margin: "auto" }}>
      <thead>
        <tr>
          <th>銘柄</th>
          <th>タール</th>
          <th>本数</th>
          <th>日付</th>
          <th>削除</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={index}>
            <td>{post.tobaccoBrand}</td>
            <td>{post.tar}</td>
            <td>{post.yanis}</td>
            <td>{formatTimestamp(post.timestamp.toDate())}</td>
            {post.useremail == currentUser?.email && (
              <td>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePostDelete(post.id)}
                >
                  x
                </a>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostsTable;
