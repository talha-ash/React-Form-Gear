import React from "react";
import FormReducer, { FormState, ReducerAction } from "./formReducer";
import { validateField as FieldValidator, validateFields as checkFormValid } from "./Validation";
import { FormFields } from "./types";

type UseReducerGeneric<T> = (
  state: FormState,
  action: ReducerAction
) => {
  fields: T & FormFields;
  isValid: boolean;
  isSubmitting: boolean;
  showError: boolean;
};

const useFormGear = <T>({
  formFields,
  afterSubmit,
  immediateError = false,
}: {
  formFields: T & FormFields;
  afterSubmit: (value: boolean) => void;
  immediateError?: boolean;
}): {
  handleChange: (e: {
    target: {
      name: string;
      value: string;
    };
  }) => void;
  handleSubmit: (e: { preventDefault: () => void }) => void;
  fields: T & FormFields;
  isValidForm: boolean;
  isSubmitting: boolean;
} => {
  const [state, dispatch] = React.useReducer<UseReducerGeneric<T>>(FormReducer, {
    fields: { ...formFields },
    isValid: true,
    isSubmitting: false,
    showError: immediateError,
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    state.fields[name].value = value;
    if (state.showError) {
      let result = FieldValidator(state.fields[name]);
      dispatch({
        type: "FieldChange",
        fields: { ...state.fields, [name]: result },
      });
    } else {
      dispatch({
        type: "FieldChange",
        fields: { ...state.fields, [name]: state.fields[name] },
      });
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch({
      type: "IsSubmitting",
      isSubmitting: true,
    });
    const { isValid, fields } = checkFormValid(state.fields);
    dispatch({
      type: "FormSubmit",
      fields,
      isValid: isValid,
    });
    afterSubmit(isValid);
  };

  return {
    handleChange: handleChange,
    handleSubmit: handleSubmit,
    fields: state.fields,
    isValidForm: state.isValid,
    isSubmitting: state.isSubmitting,
  };
};

export default useFormGear;
