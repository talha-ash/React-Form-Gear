import {
  validateField as FieldValidator,
  validateFields as checkFormValid
} from "./Validation";

const checkResult = (result, state, name) => {
  if (!result.isValid) {
    state[name].currentMessage =
      state[name].constraints[result.caughtErrorValidationIndex].errorMessage;
    state[name].error = true;
  } else {
    state[name].error = false;
  }
};

const fieldChanger = (state, { name, value }) => {
  state[name].value = value;
  console.log(state);
  let result = FieldValidator(state[name], value);
  //checkResult(result, state, name);
  return { ...state, [name]: result };
};

const FormFieldReducer = (state, action) => {
  switch (action.type) {
    case "FieldChange":
      return fieldChanger(state, action.payload);
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
