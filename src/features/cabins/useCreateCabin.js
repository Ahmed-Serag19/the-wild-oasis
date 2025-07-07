import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useCabinForms } from "../../context/cabin-form//useCabinForms";

const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { setShowAddCabin } = useCabinForms();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      setShowAddCabin(false);
    },
    onError: (err) => toast.error(err),
  });
  return { createCabin, isCreating };
};

export default useCreateCabin;

