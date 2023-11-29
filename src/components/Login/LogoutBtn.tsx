import React from "react";
import { auth } from "../../lib/firebase";
import "../../style/App.css";

const LogoutBtn: React.FC<{ onLogoutError: (error: string) => void }> = ({
  onLogoutError,
}) => {
  const handleLogout = async (): Promise<void> => {
    try {
      // await auth.signOut();
      onLogoutError("Log out successfully!");
    } catch (error) {
      onLogoutError(`Log out failed: ${error}`);
    }
  };

  return <a onClick={handleLogout}>Logout</a>;
};

export default LogoutBtn;
