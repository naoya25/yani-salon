import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import SignUp from "../components/Login/SignUp";

const LoginPage: React.FC = () => {
  return (
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
  );
};

export default LoginPage;
