const FormFieldReducer = (state, action) => {
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
        isSubmitting: action.isSubmitting
          ? action.isSubmitting
          : !state.isSubmitting,
      };
    default:
      throw new Error("Unexpected action");
  }
};

export default FormFieldReducer;
