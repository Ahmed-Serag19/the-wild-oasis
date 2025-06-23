import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import PropTypes from "prop-types";
import { useCabinForms } from "../../context/CabinFormsContext";
import { useEffect } from "react";
import useGetCabins from "./useGetCabins";
import useEditCabin from "./useEditCabin";
import useCreateCabin from "./useCreateCabin";
import toast from "react-hot-toast";

function CreateCabinForm() {
  const { cabinToEdit, setCabinToEdit, setShowAddCabin } = useCabinForms();
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);
  const { cabins } = useGetCabins();
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const handleFormSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const payload = { ...data, image };

    if (!isEditSession) {
      delete payload.id;
      delete payload.created_at;
    }
    if (!isEditSession) {
      createCabin(payload);
      reset();
    } else {
      editCabin({ ...payload, id: editId });
    }
  };

  const handleCancelButton = () => {
    if (isEditSession) {
      setCabinToEdit(null);
    } else {
      setShowAddCabin(false);
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (cabinToEdit) {
      reset(cabinToEdit);
    }
  }, [cabinToEdit, reset]);
  return (
    <Form onSubmit={handleSubmit(handleFormSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isCreating || isEditing}
          type="text"
          id="name"
          {...register("name", {
            required: "Cabin name is required",
            validate: (value) => {
              const isDuplicate = cabins.some(
                (cabin) =>
                  cabin.name.toLowerCase() === value.toLowerCase() &&
                  cabin.id !== editId
              );
              if (isDuplicate) {
                toast.error("A cabin with this name already exists");
                return false;
              }
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCreating || isEditing}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isCreating || isEditing}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Cabin price is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isCreating || isEditing}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount cannot be more than regular price",
            min: {
              value: 0,
              message: "Discount cannot be negative",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          rows={5}
          {...register("description", {
            required: "Description is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          disabled={isCreating || isEditing}
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Cabin image is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={handleCancelButton}>
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default CreateCabinForm;
