import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

const useGetCabins = () => {
  const {
    isLoading,
    data: cabins,
    // error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins };
};

export default useGetCabins;

