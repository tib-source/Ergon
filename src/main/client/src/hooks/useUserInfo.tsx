import { useAuthorizedClient } from "./useAuthorizedClient/useAuthorizedClient.tsx";
import { useJwtToken } from "./useJwtToken.tsx";
import { useQuery } from "@tanstack/react-query";
import { UserObject } from "../types.spec.ts";


export const useUserInfo = () => {
  const client = useAuthorizedClient();
  const { parsedToken } = useJwtToken();

  const username = parsedToken?.sub;

  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async (): Promise<UserObject> => {
      const response = await client.get<UserObject>(`/users/${username}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    enabled: !!username // Prevent fetching if username is undefined
  });

};