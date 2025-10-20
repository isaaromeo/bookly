import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const iniAuth = () => {
    try {
      const userData = localStorage.getItem("user");
      //const token = localStorage.getItem("token");

      if (userData && userData !== "undefined" && userData !== "null") {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } else {
        //limpiar datos corruptos
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    iniAuth();
  }, []);

  const login = (userData, token) => {
    try {
      if (!userData || !token) {
        throw new Error("Invalid user data or token");
      }
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      setUser(userData);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const updateUser = (updatedUserData) => {
    try {
      if (!updatedUserData) {
        throw new Error("Invalid user data");
      }

      localStorage.setItem("user", JSON.stringify(updatedUserData));
      setUser(updatedUserData);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const ConetxtValue = {
    user,
    login,
    logout,
    loading,
    updateUser
  };

  return (
    <AuthContext.Provider value={ConetxtValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;