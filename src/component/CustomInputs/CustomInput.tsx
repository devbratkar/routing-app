import { FormControl, FormHelperText } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { Control, RegisterOptions } from "react-hook-form/dist/types";
import "../../styles/CustomInputStyles.css";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface CustomInputType {
  name: string;
  label?: string;
  change?: (...event: any[]) => void;
  rules?: Omit<
    RegisterOptions<any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  control: Control<any> | undefined;
  inputClassName?: string;
  formControlClass?: string;
}

const CustomInput: React.FC<CustomInputType & TextFieldProps> = (props) => {
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
        <FormControl
          className={`custom-input-formcontrol ${formControlClass}`}
          error={!!error}
        >
          <TextField
            name={name}
            value={value}
            onChange={
              change
                ? (e) => {
                    change(e);
                    onChange(e);
                  }
                : onChange
            }
            className={`custom-input ${inputClassName}`}
            {...rest}
          ></TextField>

          {<FormHelperText>{!!error && error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default CustomInput;
