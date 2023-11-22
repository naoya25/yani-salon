import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../types/firebase";
import useAuth from "../types/useAuth";
import Post from "../types/Post";
import PostsTable from "./PostsTable";
import PostsChart from "./PostsChart";

const PreviewPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const currentUser = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Posts"), (snapshot) => {
      try {
        const postsData: Post[] = snapshot.docs
          .map((doc) => doc.data() as Post)
          .filter((post) => post.useremail === currentUser?.email)
          .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
        setPosts(postsData);
      } catch (error) {
        setErrorMsg(`データの取得中にエラーが発生しました: ${error}`);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser?.email]);

  return (
    <div>
      <h1>PreviewPosts</h1>
      {posts.length > 0 ? (
        <div>
          <PostsTable posts={posts} />
          <PostsChart posts={posts} />
        </div>
      ) : (
        <p>No posts available</p>
      )}

      <p>{errorMsg}</p>
    </div>
  );
};

export default PreviewPosts;
