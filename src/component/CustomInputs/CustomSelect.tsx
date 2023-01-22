import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import React from "react";
import { Controller } from "react-hook-form";
import { Control, RegisterOptions } from "react-hook-form/dist/types";
import "../../styles/CustomInputStyles.css";

type Optionstype = {
  name: string;
  value: string | number;
};

interface CustomSelectType extends SelectProps {
  name: string;
  label?: string;
  change?: (...event: any[]) => void;
  options: Optionstype[];
  rules?: Omit<
    RegisterOptions<any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  control: Control<any> | undefined;
  selectClassName?: string;
  formControlClass?: string;
}

const CustomSelect: React.FC<CustomSelectType> = (props) => {
  const {
    control,
    name,
    label,
    rules,
    options,
    change,
    selectClassName,
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
          className={`custom-select-formcontrol ${formControlClass}`}
        >
          {!!label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
          <Select
            labelId={`${name}-label`}
            name={name}
            value={value}
            onChange={
              change
                ? (e) => {
                    onChange(e);
                    change(e);
                  }
                : onChange
            }
            label={label ?? ""}
            className={`custom-select-input ${selectClassName}`}
            {...rest}
          >
            {!!options?.length &&
              options?.map(({ name, value }: Optionstype, index: number) => (
                <MenuItem key={index} value={value}>
                  {name}
                </MenuItem>
              ))}
          </Select>
          {!!error && <p>{error?.message}</p>}
        </FormControl>
      )}
    />
  );
};

export default CustomSelect;
