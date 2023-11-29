import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { tobaccos } from "../constants/tobaccos";
import useAuth from "../hooks/useAuth";

const PostPage: React.FC = () => {
  const [yanis, setYanis] = useState<number | null>();
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [customBrand, setCustomBrand] = useState<string>("");
  const [tar, setTar] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const user = useAuth();

  const handlePost = async () => {
    try {
      const brandToPost = customBrand || selectedBrand;
      if (!brandToPost) {
        setErrorMsg("銘柄を選択または入力してください");
        return;
      }
      if (!yanis || yanis < 0) {
        setErrorMsg("本数は1以上にしてください");
        return;
      }
      await addDoc(collection(db, "Posts"), {
        tobaccoBrand: brandToPost,
        tar: tar,
        yanis: yanis,
        useremail: user?.email,
        timestamp: new Date(),
      });
      setErrorMsg("Success Yani!");
    } catch (e) {
      setErrorMsg(`Error adding document: ${e}`);
    }
  };
  return (
    <div>
      <h3>New Yani Post</h3>
      <label>
        タバコの銘柄:
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">選択してください</option>
          {tobaccos.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        (選択肢に無い場合はこちらに入力:
        <input
          type="text"
          value={customBrand}
          onChange={(e) => setCustomBrand(e.target.value)}
        />)
      </label>
      <br />
      <label>
        タール:
        <input type="number" onChange={(e) => setTar(+e.target.value)} />
      </label>
      <br />
      <label>
        本数:
        <input type="number" onChange={(e) => setYanis(+e.target.value)} />
      </label>
      <br />
      <button onClick={handlePost}>Post</button>
      {errorMsg && (
        <div
          style={{
            color: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{errorMsg}</p>
          <a
            style={{ cursor: "pointer", marginLeft: 10 }}
            onClick={() => setErrorMsg("")}
          >
            X
          </a>
        </div>
      )}
    </div>
  );
};

export default PostPage;
