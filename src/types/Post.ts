import { Timestamp } from "firebase/firestore";

interface Post {
  yanis: number;
  useremail: string;
  timestamp: Timestamp;
}

export default Post;
