import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../lib/firebase";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setErrorMsg("Sign up successfully!");
    } catch (error) {
      setErrorMsg(`Sign up failed: ${error}`);
    }
  };

  return (
    <div>
      <h3>Sign up page</h3>
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
      <button onClick={handleSignUp}>Sign up</button>
      <p>{errorMsg}</p>
    </div>
  );
};

export default SignUp;
