import { Timestamp } from "firebase/firestore";

interface Post {
  id: string;
  tobaccoBrand: string;
  tar: number;
  yanis: number;
  useremail: string;
  timestamp: Timestamp;
}

export default Post;
