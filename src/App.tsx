import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import useAuth from "./components/useAuth";
import "./style/App.css";
import { auth } from "./components/firebase";
import PostYanis from "./components/PostYanis";
import PreviewPosts from "./components/PreviewPosts";

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
    <div className="App">
      {user ? (
        <div>
          <p>Logged in: {user?.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <PostYanis />
          <PreviewPosts />
        </div>
      ) : (
        <div>
          <p>Please log in or sign up.</p>
          <SignUp />
          <Login />
        </div>
      )}
      <p>{errorMsg}</p>
    </div>
  );
};

export default App;
