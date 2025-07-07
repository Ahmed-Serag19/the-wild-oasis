import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export const useGetBookings = () => {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isLoading, bookings, error };
};
