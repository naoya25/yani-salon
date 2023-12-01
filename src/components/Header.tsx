import React, { useState } from "react";
import usePosts from "../hooks/usePosts";
import useAuth from "../hooks/useAuth";
import { Link, Route, Routes } from "react-router-dom";
import calculateRank from "../utils/calculateRank";
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";
import PostPage from "../pages/PostPage";
import RankingPage from "../pages/RankingPage";
import "../style/App.css";
import LogoutBtn from "./Login/LogoutBtn";
import ProgressBar from "./UI/ProgressBar";
import UploadImage from "../pages/YannisPage";

const Header: React.FC = () => {
  const user = useAuth();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const { myposts } = usePosts();
  const exp = myposts.reduce((total, post) => total + post.yanis + post.tar, 0);
  const rankInfo = calculateRank(exp);
  const progress = (rankInfo.exp / rankInfo.requiredExp) * 100;

  return (
    <div>
      <div>
        <p>
          Rank.{rankInfo.rank}: {`<${rankInfo.rankInitial}>`}
          {rankInfo.rankTitle}
        </p>
        <p>次のランクまでの残りタール: {rankInfo.requiredExp - rankInfo.exp}</p>
        <ProgressBar progress={progress} />
      </div>
      <nav style={{ display: "flex", justifyContent: "center" }}>
        <ul
          style={{
            display: "flex",
            width: 600,
            justifyContent: "space-around",
          }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/mypage">My page</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>
          <li>
            <Link to="/yannis">Yannis</Link>
          </li>
          <li>
            <Link to="/ranking">Ranking</Link>
          </li>
          <li>Logged in: {user?.email}</li>
          <li>
            <LogoutBtn onLogoutError={setErrorMsg} />
          </li>
        </ul>
      </nav>
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/yannis" element={<UploadImage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </div>
  );
};

export default Header;
