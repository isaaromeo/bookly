import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    console.log("ooo");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const ConetxtValue = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={ConetxtValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;