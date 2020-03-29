function requiredValidation(value) {
  return value ? true : false;
}

function emailValidation(value) {
  return value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
}
function minLength(value, data) {
  return value.length >= data.min ? true : false;
}

function validateletters(value) {
  let re = /^[A-Za-z ]+$/;
  return re.test(value);
}

function validateUsername(value) {
  let usernameRex = /^[a-zA-Z0-9_][a-zA-Z]+[0-9]+$/;
  if (usernameRex.test(value)) {
    return true;
  }
  return false;
}

// function that verifies if value contains only numbers
function validateNumber(value) {
  let numberRex = new RegExp("^[0-9]+$");
  if (numberRex.test(value)) {
    return true;
  }
  return false;
}

// verifies if value is a valid URL

function validateUrl(value) {
  try {
    new URL(value);
    return true;
  } catch (_) {
    return false;
  }
}

export const validate = (value, constraint) => {
  const validator = {
    required: requiredValidation,
    email: emailValidation,
    minLength: minLength,
    url: validateUrl,
    numbers: validateNumber,
    letters: validateletters,
    username: validateUsername
  };
  if (validator[constraint.type]) {
    return validator[constraint.type](value, constraint?.data);
  }
  if (constraint.validateFunction) {
    return constraint.validateFunction[constraint.type](value, constraint);
  }
};

//need improvement like further divied
export const validateField = (field, value) => {
  let newField = {};
  let isValidForm = [];
  let trueConstraint = true;
  field.constraints.map(constraint => {
    let result = validate(value, constraint);
    if (result && trueConstraint) {
      isValidForm.push(true);
      newField = {
        ...field,
        value: value,
        isValid: true,
        errorMessage: ""
      };
    } else if (trueConstraint) {
      isValidForm.push(false);
      trueConstraint = false;
      newField = {
        ...field,
        value: value,
        isValid: false,
        errorMessage: constraint.message
      };
    }
  });
  if (field.constraints.length <= 0) {
    newField = {
      value: value,
      ...field
    };
  }
  return newField;
};

//need improvement like further divied
export const validateFields = fields => {
  let newFields = {};
  let isValidForm = [];
  Object.keys(fields).map(key => {
    let trueConstraint = true;
    fields[key].constraints.map(constraint => {
      let result = validate(
        constraint.type,
        fields[key].value,
        constraint?.data
      );

      if (result && trueConstraint) {
        isValidForm.push(true);
        newFields[key] = {
          ...fields[key],
          isValid: true,
          errorMessage: ""
        };
      } else if (trueConstraint) {
        isValidForm.push(false);
        newFields[key] = {
          ...fields[key],
          isValid: false,
          errorMessage: constraint.message
        };
        trueConstraint = false;
      }
    });

    if (fields[key].constraints.length <= 0) {
      newFields[key] = {
        ...fields[key]
      };
    }
  });

  return {
    isValid: isValidForm.includes(false) ? false : true,
    fields: newFields
  };
};
