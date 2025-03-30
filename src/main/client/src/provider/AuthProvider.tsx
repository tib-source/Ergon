import { createContext, useState } from "react";
import { useJwtToken } from "../hooks/useJwtToken.tsx";


export type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const jwtToken = useJwtToken()
  let auth = false
  const nowSeconds = Math.floor(Date.now() / 1000);

  if (jwtToken.parsedToken) {
    if (jwtToken.parsedToken.exp > nowSeconds) {
      auth = true;
    }
  }
  const [isAuthenticated, setIsAuthenticated] = useState(auth);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


