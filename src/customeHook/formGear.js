import React, { useReducer, useCallback } from "react";
import FormReducer from "./formReducer";
const useFormGear = ({ formFields, afterSubmit }) => {
  const [fields, dispatch] = useReducer(FormReducer, formFields);
  console.log(afterSubmit);
  const handleChange = useCallback(e => {
    dispatch({
      type: "FieldChange",
      payload: {
        name: e.target.name,
        value: e.target.value
      }
    });
  }, []);

  const handleSubmit = useCallback(e => {
    dispatch({
      type: "FormSubmit",
      afterSubmit
    });
  }, []);

  return {
    handleChange: handleChange,
    handleSubmit: handleSubmit,
    fields: fields
  };
};

export default useFormGear;
