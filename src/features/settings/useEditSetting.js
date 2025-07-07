import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

const useEditSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: editSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings Updated successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err),
  });
  return { editSetting, isUpdating };
};

export default useEditSettings;

