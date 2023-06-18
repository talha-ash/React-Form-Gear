import { FieldConstraints, FormField } from "./types";
export declare const validate: (value: any, constraint: FieldConstraints) => boolean;
export declare const validateField: (field: FormField) => {};
export declare const validateFields: (fields: {
    [x: string]: any;
}) => {
    isValid: boolean;
    fields: Record<string, FormField>;
};
mField>;
};
