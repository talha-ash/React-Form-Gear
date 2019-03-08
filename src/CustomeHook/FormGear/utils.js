import _ from "lodash";
const FormValidation = {
  REQUIRED: function(value) {
    return Validate.validateRequired(value) ? true : false;
  },
  EMAIL: function(value) {
    return Validate.validateEmail(value) ? true : false;
  },
  LETTER: function(value) {
    return Validate.validateletters(value) ? true : false;
  },
  NUMBER: function(value) {
    return Validate.validateNumber(value) ? true : false;
  },
  LENGTH: function(value) {
    return Validate.validateLength(value, 6) ? true : false;
  }
};

const Validate = {
  validateletters: field => {
    let re = /^[A-Za-z ]+$/;
    return re.test(field);
  },

  validateRequired: field => {
    if (field === "") {
      return false;
    } else {
      return true;
    }
  },
  validateEmail: value => {
    let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  },

  validateUsername: value => {
    let usernameRex = /^[a-zA-Z0-9_][a-zA-Z]+[0-9]+$/;
    if (usernameRex.test(value)) {
      return true;
    }
    return false;
  },

  // function that verifies if a string has a given length or not
  validateLength: (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  },

  // function that verifies if two strings are equal
  compare: (string1, string2) => {
    if (string1 === string2) {
      return true;
    }
    return false;
  },

  // function that verifies if value contains only numbers
  validateNumber: value => {
    let numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  },

  // verifies if value is a valid URL

  validateUrl: value => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }
};

const FieldValidator = field => {
  let result = true;
  let caughtErrorValidationIndex = 0;
  _.forIn(field.constraints, (constraint, key) => {
    console.log(!FormValidation[key](field.value));
    if (!FormValidation[key](field.value)) {
      result = false;
      caughtErrorValidationIndex = key;
      return false;
    }
    return true;
  });
  console.log(caughtErrorValidationIndex);
  return { isValid: !result, caughtErrorValidationIndex };
};

const checkFormValid = fields => {
  let isValid = true;
  for (let field in fields) {
    let result = FieldValidator(fields[field]);
    if (result.isValid) {
      fields[field].error = result.isValid;
      fields[field].currentMessage = result.isValid
        ? fields[field].constraints[result.caughtErrorValidationIndex][
            "errorMessage"
          ]
        : "";
    }
    isValid = false;
  }
  return { isValid, fields: fields };
};

export { FieldValidator, checkFormValid };
