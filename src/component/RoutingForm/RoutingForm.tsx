import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomCheckbox from "../CustomInputs/CustomCheckbox";
import CustomInput from "../CustomInputs/CustomInput";
import CustomSelect from "../CustomInputs/CustomSelect";
import { GlobalContext } from "../../Context";

type DefaultFormType = {
  protected: string;
  dynamic: string;
  component: string;
  path: string;
  isDynamic: boolean;
  isExact: boolean;
};

type PropType = {
  index?: number;
};

const defaultValues: DefaultFormType = {
  protected: "false",
  dynamic: "",
  component: "",
  path: "",
  isDynamic: false,
  isExact: false,
};

const basicRule = {
  required: "This Field is Required.",
};

const RoutingForm: React.FC<PropType> = () => {
  const {
    state: { routing, index, mode },
    dispatch,
  } = useContext(GlobalContext);
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });
  const onSubmit = async (values: DefaultFormType) => {
    if (mode === "ADD") {
      dispatch({
        type: "ADD_ROUTE",
        payload: { ...values, id: index },
      });
    }
    if (mode === "UPDATE") {
      dispatch({
        type: "UPDATE_ROUTE",
        payload: { ...values, id: index },
      });
    }
    reset(defaultValues);
  };

  const isDynamicPath = watch("isDynamic");

  useEffect(() => {
    if (mode === "UPDATE") reset(routing[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, index]);
  return (
    <form className="routing-form" onSubmit={handleSubmit(onSubmit)}>
      <CustomSelect
        control={control}
        name="protected"
        rules={basicRule}
        options={[
          {
            name: "Protected Route",
            value: "true",
          },
          {
            name: "Open Route",
            value: "false",
          },
        ]}
      />
      <CustomInput
        name="path"
        type="text"
        control={control}
        rules={{
          ...basicRule,
          validate: {
            slashStart: (value) =>
              /^\//.test(value)
                ? true
                : "Path should start with a forward slash.",
          },
        }}
        placeholder="Path name ex. /login"
        label="Path"
        variant="outlined"
      />
      <CustomInput
        name="component"
        type="text"
        control={control}
        rules={{
          ...basicRule,
          validate: {
            capsStart: (value) =>
              /^[A-Z]/.test(value)
                ? true
                : "Component should start with captial letters.",
          },
        }}
        placeholder="Component Name ex. App"
        label="Component"
        variant="outlined"
      />
      <CustomInput
        name="dynamic"
        type="text"
        control={control}
        rules={{
          ...(!isDynamicPath && { required: false }),
          ...(isDynamicPath && {
            ...basicRule,
            pattern: {
              value: /^\/:/,
              message:
                "Dynamic path should start with forward slash and colon.",
            },
          }),
        }}
        disabled={!isDynamicPath}
        placeholder="Dynamic Path ex. /:id"
        label="Dynamic"
        variant="outlined"
      />
      <CustomCheckbox
        name="isDynamic"
        control={control}
        label="Dynamic"
        change={(e) => {
          setValue("dynamic", "");
        }}
      />
      <CustomCheckbox name="isExact" control={control} label="Exact" />

      <button className="routing-form-add" type="submit">
        Add
      </button>
    </form>
  );
};

export default RoutingForm;
