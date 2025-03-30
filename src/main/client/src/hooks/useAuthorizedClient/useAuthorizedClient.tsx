import { useJwtToken } from "../useJwtToken.tsx";
import { useErgonClient } from "../useErgonClient/useErgonClient.tsx";


export const useAuthorizedClient = () => {
    const { token } = useJwtToken();
    return useErgonClient(token);
}