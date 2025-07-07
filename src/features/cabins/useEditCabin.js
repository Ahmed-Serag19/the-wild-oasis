import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useCabinForms } from "../../context/cabin-form//useCabinForms";

const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { setCabinToEdit } = useCabinForms();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      setCabinToEdit(null);
    },
    onError: (err) => toast.error(err),
  });
  return { editCabin, isEditing };
};

export default useEditCabin;

