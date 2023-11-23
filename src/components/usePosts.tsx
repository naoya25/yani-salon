import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../types/firebase";
import useAuth from "../types/useAuth";
import Post from "../types/Post";

const usePosts = () => {
  const [allposts, setAllPosts] = useState<Post[]>([]);
  const [myposts, setMyPosts] = useState<Post[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const currentUser = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Posts"), (snapshot) => {
      try {
        const postsData: Post[] = snapshot.docs
          .map((doc) => doc.data() as Post)
          .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
        setAllPosts(postsData);
        setMyPosts(
          postsData.filter((post) => post.useremail === currentUser?.email)
        );
      } catch (error) {
        setErrorMsg(`データの取得中にエラーが発生しました: ${error}`);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser?.email]);

  return { allposts, myposts, errorMsg };
};

export default usePosts;
