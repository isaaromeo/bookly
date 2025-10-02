import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🎯 AuthProvider - INICIANDO, buscando usuario...");
    const userData = localStorage.getItem("user");
    console.log("📦 localStorage user:", userData);
    if (userData) {
      setUser(JSON.parse(userData));
      console.log("✅ AuthProvider - Usuario cargado:", userData);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    console.log("🔑 AuthProvider - LOGIN llamado con:", userData.username);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    console.log(
      "✅ AuthProvider - Estado actualizado, user ahora:",
      userData.username
    );
  };

  const logout = () => {
    console.log("ooo")
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

  return <AuthContext.Provider value={ConetxtValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;