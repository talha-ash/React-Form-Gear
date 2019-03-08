import { FieldValidator, checkFormValid } from "./utils";

const checkResult = (result, state, name) => {
  if (result.isValid) {
    state[name].currentMessage =
      state[name].constraints[result.caughtErrorValidationIndex].errorMessage;
    state[name].error = result.isValid;
  }
};

const fieldChanger = (state, { name, value }) => {
  state[name].value = value;
  let result = FieldValidator(state[name]);
  checkResult(result, state, name);
  return { ...state };
};

const FormFieldReducer = (state, action) => {
  switch (action.type) {
    case "FieldChange":
      return fieldChanger(state, action.payload);
    case "FormSubmit":
      const { isValid, fields } = checkFormValid(state);
      return { ...fields };
    default:
      throw new Error("Unexpected action");
  }
};

export default FormFieldReducer;
