import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../types/firebase";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSignUp = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMsg("Login successfully!");
    } catch (error) {
      setErrorMsg(`Login failed: ${error}`);
    }
  };

  return (
    <div>
      <h3>Login page</h3>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Login</button>
      <p>{errorMsg}</p>
    </div>
  );
};

export default Login;
