import { useQuery } from "@tanstack/react-query";
import { useAuthorizedClient } from "@/hooks/useAuthorizedClient/useAuthorizedClient.tsx";
import { Booking } from "@/types.spec.ts";
import { AxiosResponse } from "axios";

export const useBookingList = () => {
  const client = useAuthorizedClient()
  return useQuery<AxiosResponse<Booking[]>>(
    {
      queryKey: ["bookings", "history"],
      queryFn: () => client.get("/bookings")
    }
  );
}