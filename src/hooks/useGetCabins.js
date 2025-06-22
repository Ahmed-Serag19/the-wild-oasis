import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";

const useGetCabins = () => {
  const {
    isLoading,
    data: cabins,
    // error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  const sortedCabins = Array.isArray(cabins)
    ? [...cabins].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true })
      )
    : [];
  return { isLoading, sortedCabins, cabins };
};

export default useGetCabins;
