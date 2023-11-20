// AuthContext.js
import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInState, setLoggedIn] = useState({
    isLoggedIn: false,
    username: "",
  });

  const login = ({ username }) => {
    // Logic for authentication...
    setLoggedIn({ loggedInState, isLoggedIn: true, username });
  };

  const logout = () => {
    // Logic for logout...
    setLoggedIn({ loggedInState, isLoggedIn: false, username: "" });
  };

  return (
    <AuthContext.Provider value={{ loggedInState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
