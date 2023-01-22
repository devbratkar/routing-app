import React, { ChangeEvent, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomCheckbox from "../CustomInputs/CustomCheckbox";
import CustomInput from "../CustomInputs/CustomInput";
import CustomSelect from "../CustomInputs/CustomSelect";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
  index: number;
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

const RoutingForm: React.FC<PropType> = ({ index }) => {
  const {
    state: { routing },
    dispatch,
  } = useContext(GlobalContext);
  const { control, watch, handleSubmit, setValue, reset } = useForm({
    mode: "onChange",
    defaultValues,
  });
  const onSubmit = async (values: DefaultFormType) => {
    dispatch({
      type: "UPDATE_ROUTE",
      payload: { index, data: { ...values } },
    });
    dispatch({
      type: "ADD_ROUTE",
      payload: { index: index + 1, data: { ...values } },
    });
    // reset();
  };
  const changeHandler = (e: ChangeEvent<any>) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { index, data: [e.target!.name, e.target!.value] },
    });
  };
  const isDynamicPath = watch("isDynamic");
  useEffect(() => {
    setValue("dynamic", "");
  }, [isDynamicPath, setValue]);
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
        change={(e) => {
          const { name, value } = e.target;
          routing[index] = { ...routing[index], [name]: value };
        }}
      />
      <CustomInput
        name="path"
        type="text"
        control={control}
        rules={basicRule}
        placeholder="Routing Path"
        label="Path"
        variant="outlined"
        change={(e) => {
          const { name, value } = e.target;
          routing[index] = { ...routing[index], [name]: value };
        }}
      />
      <CustomInput
        name="component"
        type="text"
        control={control}
        rules={basicRule}
        placeholder="Component Name"
        label="Component"
        variant="outlined"
        change={(e) => {
          const { name, value } = e.target;
          routing[index] = { ...routing[index], [name]: value };
        }}
      />
      <CustomInput
        name="dynamic"
        type="text"
        control={control}
        rules={isDynamicPath ? basicRule : { required: false }}
        disabled={!isDynamicPath}
        placeholder="Dynamic Path"
        label="Dynamic"
        variant="outlined"
        change={(e) => {
          const { name, value } = e.target;
          routing[index] = { ...routing[index], [name]: value };
        }}
      />
      <CustomCheckbox
        name="isDynamic"
        control={control}
        label="Dynamic"
        change={(e) => {
          const { name, checked } = e.target;
          routing[index] = { ...routing[index], [name]: checked };
        }}
      />
      <CustomCheckbox
        name="isExact"
        control={control}
        label="Exact"
        change={(e) => {
          const { name, checked } = e.target;
          routing[index] = { ...routing[index], [name]: checked };
        }}
      />

      <button
        type="submit"
        style={{ background: "transparent", border: "none" }}
      >
        <AddCircleIcon />
      </button>
    </form>
  );
};

export default RoutingForm;
