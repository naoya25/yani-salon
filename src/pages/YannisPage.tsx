import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { validateImage } from "image-validator";
import { db, storage } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import useImages from "../hooks/useImages";
import PreviewImage from "../components/PreviewImage";

const YannisPage: React.FC = () => {
  const user = useAuth();
  const [file, setFile] = useState<File>(null!);
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { allImages, imagesError } = useImages();

  const validateFile = async (file: File) => {
    const limitFileSize = 3 * 1024 * 1024;
    if (file.size > limitFileSize) {
      setErrorMsg(
        "ファイルサイズが大きすぎます。\n3ギガバイト以下にしてください。"
      );
      return false;
    }
    const isValidImage = await validateImage(file);
    if (!isValidImage) {
      setErrorMsg("画像ファイル以外はアップロードできません。");
      return false;
    }
    return true;
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    e.preventDefault();
    const file = e.target.files![0];
    const reader = new FileReader();

    if (!(await validateFile(file))) return;

    reader.onloadend = async () => {
      setFile(file);
      setImagePreview(reader.result as string);
      setErrorMsg("");
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    if (!file) {
      setErrorMsg("ファイルが選択されていません。");
      return;
    }
    const timestamp = new Date().getTime();
    const uniqueFilename = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `images/${uniqueFilename}`);

    // storageにアップロード部分
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        setErrorMsg("Image saved.");
      })
      .catch((e) => {
        setErrorMsg(`Failed to save image: ${e}`);
      });

    // firestoreにアップロードした画像とテキストをセットで保存する
    try {
      await addDoc(collection(db, "Images"), {
        text: text,
        imageUrl: uniqueFilename,
        useremail: user?.email,
        timestamp: new Date(),
      });
      setErrorMsg("Submission completed!");
    } catch (e) {
      setErrorMsg(`Error adding document: ${e}`);
    }
  };

  return (
    <div>
      <form>
        <input type="file" onChange={handleImageSelect} />
        <br />
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
            setErrorMsg("");
          }}
        />
        <br />
        <a style={{ cursor: "pointer" }} onClick={uploadImage}>
          アップロード
        </a>
      </form>
      <p style={{ color: "red" }}>{errorMsg}</p>
      {imagePreview && (
        <img
          src={imagePreview}
          style={{
            width: "auto",
            height: 200,
            objectFit: "cover",
          }}
        />
      )}
      <h3>投稿一覧</h3>

      <div className="container">
        <div className="row">
          {allImages.map((image) => (
            <div className="col-4">
              <PreviewImage image={image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YannisPage;
