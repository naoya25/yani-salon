import { Timestamp } from "firebase/firestore";

interface Image {
  id: string;
  imageUrl: string;
  text: number;
  useremail: string;
  timestamp: Timestamp;
}

export default Image;
