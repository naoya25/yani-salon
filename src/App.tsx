import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import useAuth from "./components/useAuth";
import "./style/App.css";
import { auth } from "./components/firebase";

function App() {
  const user = useAuth();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const handleLogout = async () => {
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
          <p>ログイン中: {user?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
      <p>{errorMsg}</p>
      <SignUp />
      <Login />
    </div>
  );
}

export default App;
