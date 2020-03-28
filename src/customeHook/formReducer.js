import {
  validateField as FieldValidator,
  validateFields as checkFormValid
} from "./Validation";

const handleFieldChange = (state, { name, value }) => {
  state[name].value = value;
  let result = FieldValidator(state[name], value);
  return { ...state, [name]: result };
};

const FormFieldReducer = (state, action) => {
  switch (action.type) {
    case "FieldChange":
      return handleFieldChange(state, action.payload);
    case "FormSubmit":
      const { isValid, fields } = checkFormValid(state);
      if (isValid) {
        action.afterSubmit();
      }
      return { ...fields };
    default:
      throw new Error("Unexpected action");
  }
};

export default FormFieldReducer;
