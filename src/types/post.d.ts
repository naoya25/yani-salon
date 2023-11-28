import { Timestamp } from "firebase/firestore";

interface Post {
  tobaccoBrand: string;
  tar: number;
  yanis: number;
  useremail: string;
  timestamp: Timestamp;
}

export default Post;
