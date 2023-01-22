import React from "react";
import { FormControl } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Controller } from "react-hook-form";
import { Control, RegisterOptions } from "react-hook-form/dist/types";
import "../../styles/CustomInputStyles.css";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

interface CustomCheckboxType extends CheckboxProps {
  name: string;
  label: string;
  change?: (...event: any[]) => void;
  rules?: Omit<
    RegisterOptions<any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  control: Control<any> | undefined;
  inputClassName?: string;
  formControlClass?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxType> = (props) => {
  const {
    control,
    name,
    label,
    rules,
    change,
    inputClassName,
    formControlClass,
    ...rest
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...(rules ?? {}),
      }}
      render={({ field: { name, value, onChange }, fieldState: { error } }) => (
        <FormControl className={`custom-input-formcontrol ${formControlClass}`}>
          <FormControlLabel
            control={
              <Checkbox
                name={name}
                checked={value}
                onChange={
                  change
                    ? (e) => {
                        change(e);
                        onChange(e);
                      }
                    : onChange
                }
                {...rest}
              />
            }
            label={label}
          />
          {!!error && <p>{error?.message}</p>}
        </FormControl>
      )}
    />
  );
};

export default CustomCheckbox;
