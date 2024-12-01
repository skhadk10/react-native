import { useState, useEffect, createContext } from "react";
import { getFromLocalStorage } from "../helper/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(getFromLocalStorage("auth"));
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
