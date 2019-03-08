import React, { useReducer, useCallback } from "react";
import _ from "lodash";

import FormFieldReducer from "./FormFieldsReducer";
const useFormGear = Formfields => {
  const [fields, dispatch] = useReducer(
    FormFieldReducer,
    _.cloneDeep(Formfields)
  );

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
      type: "FormSubmit"
    });
  }, []);

  return {
    handleChange: handleChange,
    handleSubmit: handleSubmit,
    fields: fields
  };
};

export default useFormGear;
