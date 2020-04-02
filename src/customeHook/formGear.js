import React from "react";
import FormReducer from "./formReducer";
import {
  validateField as FieldValidator,
  validateFields as checkFormValid
} from "./Validation";

const useFormGear = ({ formFields, afterSubmit }) => {
  const [state, dispatch] = React.useReducer(FormReducer, {
    fields: { ...formFields },
    isValid: true,
    isSubmitting: false
  });

  const handleChange = e => {
    const { name, value } = e.target;
    state.fields[name].value = value;
    let result = FieldValidator(state.fields[name]);
    dispatch({
      type: "FieldChange",
      fields: { ...state.fields, [name]: result }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({
      type: "IsSubmitting",
      isSubmitting: true
    });
    const { isValid, fields } = checkFormValid(state.fields);
    dispatch({
      type: "FormSubmit",
      fields,
      isValid: isValid
    });
    if (isValid) {
      afterSubmit(isValid);
    }
  };

  return {
    handleChange: handleChange,
    handleSubmit: handleSubmit,
    fields: state.fields,
    isValidForm: state.isValid,
    isSubmitting: state.isSubmitting
  };
};

export default useFormGear;
