import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { auth } from "../lib/firebase";
import Header from "../components/Header";
import MyPage from "./MyPage";
import PostPage from "./PostPage";
import RankingPage from "./RankingPage";

const Home: React.FC = () => {
  const user = useAuth();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleLogout = async (): Promise<void> => {
    try {
      await auth.signOut();
      setErrorMsg("Log out successfully!");
    } catch (error) {
      setErrorMsg(`Log out failed: ${error}`);
    }
  };

  return (
    <div>
      <Header />
      <nav style={{ display: "flex", justifyContent: "center" }}>
        <ul
          style={{
            display: "flex",
            width: 600,
            justifyContent: "space-around",
          }}
        >
          <li>
            <Link to="/mypage">My page</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>
          <li>
            <Link to="/ranking">Ranking</Link>
          </li>
          <li>Logged in: {user?.email}</li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
      <p>{errorMsg}</p>
    </div>
  );
};

export default Home;
