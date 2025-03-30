import { Navigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider.tsx";
import Root from "../routes/Root";

export const  PrivateRoutes = () => {
  const { isAuthenticated } = useAuth()
  console.log(isAuthenticated)
  return isAuthenticated ?
    <Root />
    : <Navigate to="/login" />;
}