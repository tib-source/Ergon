import { useContext } from "react";
import { AuthContext, AuthContextType } from "../provider/AuthProvider.tsx";

export const useAuth = (): AuthContextType => useContext(AuthContext) as AuthContextType;