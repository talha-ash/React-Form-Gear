function requiredValidation(value) {
  return value ? true : false;
}

function emailValidation(value) {
  return value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
}
function minLength(value, data) {
  return value.length >= data.min ? true : false;
}

export const validate = (type, value, data) => {
  const validator = {
    required: requiredValidation,
    email: emailValidation,
    minLength: minLength
  };
  return validator[type](value, data);
};

export const validateField = (field, value) => {
  let newField = {};
  let isValidForm = [];
  let trueConstraint = true;
  field.constraints.map(constraint => {
    let result = validate(constraint.type, value, constraint?.data);
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

export const validateFields = fields => {
  //let fields = this.state.fields;
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
