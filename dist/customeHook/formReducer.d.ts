import { FormFields } from "./types";
declare const FormFieldReducer: (state: FormState, action: ReducerAction) => {
    fields: any;
    isValid: boolean;
    isSubmitting: boolean;
    showError: boolean;
};
export default FormFieldReducer;
export type FormState = {
    fields: FormFields;
    isValid: boolean;
    isSubmitting: boolean;
    showError: boolean;
};
export type ReducerAction = {
    type: "FieldChange";
    fields: any;
} | {
    type: "FormSubmit";
    fields: any;
    isValid: boolean;
} | {
    type: "IsSubmitting";
    isSubmitting: boolean;
};
