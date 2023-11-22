import React, { useEffect, useState } from "react";
import { Timestamp, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

interface Post {
  yanis: number;
  useremail: string;
  timestamp: Timestamp;
}

const PreviewPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Posts"),
      (snapshot) => {
        const postsData: Post[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as Post[];
        postsData.sort(
          (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
        );
        setPosts(postsData);
      },
      (error) => {
        setErrorMsg(`Error fetching data: ${error}`);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>PreviewPosts</h1>

      {posts.length > 0 ? (
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
                <td>
                  {new Date(post.timestamp.toMillis()).toLocaleString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No posts available</p>
      )}

      <p>{errorMsg}</p>
    </div>
  );
};

export default PreviewPosts;
