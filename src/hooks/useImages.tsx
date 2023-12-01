import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import useAuth from "./useAuth";
import Image from "../types/image";

const useImages = () => {
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [imagesError, setErrorMsg] = useState<string>("");
  const currentUser = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Images"), (snapshot) => {
      try {
        const imagesData: Image[] = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id } as Image))
          .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
        setAllImages(imagesData);
      } catch (error) {
        setErrorMsg(`データの取得中にエラーが発生しました: ${error}`);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser?.email]);

  return { allImages, imagesError };
};

export default useImages;
