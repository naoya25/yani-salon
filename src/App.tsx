import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PostYanis from "./components/PostYanis";
import PreviewPosts from "./components/PreviewPosts";
import SignUp from "./components/SignUp";
import RankPreview from "./components/RankInfo";
import Ranking from "./components/Ranking";
import { auth } from "./types/firebase";
import useAuth from "./types/useAuth";
import "./style/App.css";
import Recommend from "./components/Recomend";

const App: React.FC = () => {
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
    <BrowserRouter>
      <div className="App">
        <h1>Yani Salon</h1>
        {user ? (
          <div>
            <RankPreview />
            <nav style={{ display: "flex", justifyContent: "center" }}>
              <ul
                style={{
                  display: "flex",
                  width: 600,
                  justifyContent: "space-around",
                }}
              >
                <li>
                  <Link to="/">My page</Link>
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
              <Route path="/" element={<PreviewPosts />} />
              <Route path="/post" element={<PostYanis />} />
              <Route path="/ranking" element={<Ranking />} />
            </Routes>
          </div>
        ) : (
          <div>
            <p>Please log in or sign up.</p>
            <nav style={{ display: "flex", justifyContent: "center" }}>
              <ul
                style={{
                  display: "flex",
                  width: 400,
                  justifyContent: "space-around",
                }}
              >
                <li style={{ listStyle: "none" }}>
                  <Link to="/">Login</Link>
                </li>
                <li style={{ listStyle: "none" }}>
                  <Link to="/signup">Sign up</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        )}
        <p>{errorMsg}</p>
        <Recommend />
      </div>
    </BrowserRouter>
  );
};

export default App;
