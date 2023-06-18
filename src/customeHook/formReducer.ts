import { FormFields } from "./types";

const FormFieldReducer = (state: FormState, action: ReducerAction) => {
  switch (action.type) {
    case "FieldChange":
      return { ...state, fields: action.fields };
    case "FormSubmit":
      const { fields, isValid } = action;
      return { ...state, fields, isValid, isSubmitting: false };
    case "IsSubmitting":
      return {
        ...state,
        showError: true,
        isSubmitting: action.isSubmitting ? action.isSubmitting : !state.isSubmitting,
      };
    default:
      throw new Error("Unexpected action");
  }
};

export default FormFieldReducer;

export type FormState = {
  fields: FormFields;
  isValid: boolean;
  isSubmitting: boolean;
  showError: boolean;
};

export type ReducerAction =
  | {
      type: "FieldChange";
      fields: any;
    }
  | {
      type: "FormSubmit";
      fields: any;
      isValid: boolean;
    }
  | {
      type: "IsSubmitting";
      isSubmitting: boolean;
    };
