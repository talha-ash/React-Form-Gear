import { FormFields } from "./types";
declare const useFormGear: <T>({ formFields, afterSubmit, immediateError, }: {
    formFields: T & FormFields;
    afterSubmit: (value: boolean) => void;
    immediateError?: boolean;
}) => {
    handleChange: (e: {
        target: {
            name: string;
            value: string;
        };
    }) => void;
    handleSubmit: (e: {
        preventDefault: () => void;
    }) => void;
    fields: T & FormFields;
    isValidForm: boolean;
    isSubmitting: boolean;
};
export default useFormGear;
seFormGear;
