import { createContext, useContext, useState } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(!!jwtToken?.parsedToken.sub);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () : AuthContextType  => useContext(AuthContext) as AuthContextType;