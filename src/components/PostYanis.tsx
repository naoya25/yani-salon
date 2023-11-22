import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../types/firebase";
import useAuth from "../types/useAuth";

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
      setErrorMsg('Success Yani!');
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
