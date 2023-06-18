export type FormFields = Record<string, FormField>;
export type FormField = {
  value: string;
  isValid: boolean;
  errorMessage: string;
  constraints: FieldConstraints[];
};

export type FieldConstraints =
  | {
      type: string;
      message: string;
      data?: Record<string, any>;
    }
  | {
      type: string;
      message: string;
      validateFunction: Record<string, (value: any, data?: any) => boolean>;
      data?: Record<string, any>;
    };
