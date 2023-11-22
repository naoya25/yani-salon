import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import useAuth from "./useAuth";

const PostYanis: React.FC = () => {
  const [yanis, setYanis] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const user = useAuth();
  const handlePost = async () => {
    try {
      const docRef = await addDoc(collection(db, "Posts"), {
        yanis: yanis,
        useremail: user?.email,
        timestamp: new Date(),
      });
      setErrorMsg(`Document written with ID: ${docRef.id}`);
    } catch (e) {
      setErrorMsg(`Error adding document: ${e}`);
    }
  };
  return (
    <div>
      <input type="number" onChange={(e) => setYanis(+e.target.value)} />
      <button onClick={handlePost}>Post</button>
      <p>{errorMsg}</p>
    </div>
  );
};

export default PostYanis;
