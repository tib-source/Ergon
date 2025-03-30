import { useJwtToken } from "./useJwtToken.tsx";

export const useUserRole = () => {
  const { parsedToken } = useJwtToken();
  let isAdmin = false;

  parsedToken?.authorities.forEach((authority) => {
    if (authority.authority === "ROLE_ADMIN") {
      isAdmin = true;
    }
  });

  return isAdmin;
};