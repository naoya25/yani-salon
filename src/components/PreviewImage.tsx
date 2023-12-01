import React, { useState } from "react";
import Image from "../types/image";
import { formatTimestamp } from "../utils/formatTimestamp";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";

const PreviewImage: React.FC<{ image: Image }> = ({ image }) => {
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  getDownloadURL(ref(storage, `images/${image.imageUrl}`))
    .then((url) => {
      setPrevUrl(url);
    })
    .catch((e) => {
      setError(`${e}`);
    });

  return (
    <div
      style={{
        boxShadow: "0px 4px 8px gray",
        padding: 10,
        margin: 10,
        width: 350,
        height: 400,
      }}
    >
      <p>
        <img
          src={prevUrl}
          alt={error}
          style={{ height: 200, width: 300, objectFit: "cover" }}
        />
      </p>
      <p>{image.text}</p>
      <p>{formatTimestamp(image.timestamp.toDate())}</p>
      <p>{image.useremail}</p>
    </div>
  );
};

export default PreviewImage;
