import { Navigate } from "react-router-dom";
import Root from "../routes/Root";
import { useAuth } from "../hooks/UseAuth.tsx";

export const  PrivateRoutes = () => {
  const { isAuthenticated } = useAuth()
  console.log(isAuthenticated)
  return isAuthenticated ?
    <Root />
    : <Navigate to="/login" />;
}