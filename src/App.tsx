import React from "react";
import { BrowserRouter } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  const user = useAuth();

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Yani Salon</h1>
        {user ? <Home /> : <LoginPage />}
      </div>
    </BrowserRouter>
  );
};

export default App;
