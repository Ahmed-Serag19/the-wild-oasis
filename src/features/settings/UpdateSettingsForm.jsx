import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import SpinnerMini from "../../ui/SpinnerMini";
import useEditSettings from "./useEditSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      breakfastPrice,
      maxGuestsPerBooking,
      maxBookingLength,
      minBookingLength,
    } = {},
  } = useSettings();
  const { editSetting, isUpdating } = useEditSettings();
  const handleEdit = (e, field) => {
    const newValue = e.target.value;
    if (!newValue) return;
    const currentValue = {
      breakfastPrice,
      maxGuestsPerBooking,
      maxBookingLength,
      minBookingLength,
    }[field];
    const numericValue = Number(newValue);
    const numericCurrentValue = Number(currentValue);
    if (numericValue === numericCurrentValue) return;
    editSetting({ [field]: numericValue });
  };
  if (isLoading) return <SpinnerMini />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          // {...register("minBookingLength", { valueAsNumber: true })}
          onBlur={(e) => handleEdit(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          // {...register("maxBookingLength", { valueAsNumber: true })}
          onBlur={(e) => handleEdit(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          // {...register("maxGuestsPerBooking", { valueAsNumber: true })}
          onBlur={(e) => handleEdit(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          // {...register("breakfastPrice", { valueAsNumber: true })}
          onBlur={(e) => handleEdit(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
