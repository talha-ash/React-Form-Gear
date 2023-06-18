import { FieldConstraints, FormField } from "./types";

function requiredValidation(value: string) {
  return value ? true : false;
}

function emailValidation(value: string) {
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailReg.test(value);
}
function minLength(value: string, data: { min: number }) {
  return value.length >= data.min ? true : false;
}

function validateletters(value: string) {
  let re = /^[A-Za-z ]+$/;
  return re.test(value);
}

function validateUsername(value: string) {
  let usernameRex = /^[a-zA-Z0-9_][a-zA-Z]+[0-9]+$/;
  if (usernameRex.test(value)) {
    return true;
  }
  return false;
}

// function that verifies if value contains only numbers
function validateNumber(value: string) {
  let numberRex = new RegExp("^[0-9]+$");
  if (numberRex.test(value)) {
    return true;
  }
  return false;
}

// verifies if value is a valid URL

function validateUrl(value: string | URL) {
  try {
    new URL(value);
    return true;
  } catch (_) {
    return false;
  }
}

export const validate = (value: any, constraint: FieldConstraints) => {
  if ("validateFunction" in constraint) {
    return constraint.validateFunction[constraint.type](value, constraint);
  }

  const validator: Record<string, (value: string, data?: any) => boolean> = {
    required: requiredValidation,
    email: emailValidation,
    minLength: minLength,
    url: validateUrl,
    numbers: validateNumber,
    letters: validateletters,
    username: validateUsername,
  };
  if (validator[constraint.type]) {
    return validator[constraint.type](value, constraint?.data);
  }
};

//need improvement like further divied
export const validateField = (field: FormField) => {
  let newField = {};
  let isValidForm = [];
  let trueConstraint = true;
  field.constraints.map((constraint: FieldConstraints) => {
    let result = validate(field.value, constraint);
    if (result && trueConstraint) {
      isValidForm.push(true);
      newField = {
        ...field,
        //value: value,
        isValid: true,
        errorMessage: "",
      };
    } else if (trueConstraint) {
      isValidForm.push(false);
      trueConstraint = false;
      newField = {
        ...field,
        //value: value,
        isValid: false,
        errorMessage: constraint.message,
      };
    }
  });
  if (field.constraints.length <= 0) {
    newField = {
      //value: value,
      ...field,
    };
  }
  return newField;
};

//need improvement like further divied
export const validateFields = (fields: { [x: string]: any }) => {
  let newFields: Record<string, FormField> = {};
  let isValidForm: boolean[] = [];
  Object.keys(fields).map((key) => {
    let trueConstraint = true;
    fields[key].constraints.map((constraint: FieldConstraints) => {
      let result = validate(fields[key].value, constraint);
      if (result && trueConstraint) {
        isValidForm.push(true);
        newFields[key] = {
          ...fields[key],
          isValid: true,
          errorMessage: "",
        };
      } else if (trueConstraint) {
        isValidForm.push(false);
        newFields[key] = {
          ...fields[key],
          isValid: false,
          errorMessage: constraint.message,
        };
        trueConstraint = false;
      }
    });

    if (fields[key].constraints.length <= 0) {
      newFields[key] = {
        ...fields[key],
      };
    }
  });
  return {
    isValid: isValidForm.includes(false) ? false : true,
    fields: newFields,
  };
};
