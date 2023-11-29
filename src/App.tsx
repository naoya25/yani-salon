import React from "react";
import { BrowserRouter } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

const App: React.FC = () => {
  const user = useAuth();

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Yani Salon</h1>
        {user ? <Header /> : <LoginPage />}
      </div>
    </BrowserRouter>
  );
};

export default App;
