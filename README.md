# react-form-gear

> Simple hook for handling form in simple way

[![NPM](https://img.shields.io/npm/v/react-form-gear)](https://www.npmjs.com/package/react-form-gear) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> react 16.13 or higher
> Version 2 is Stable one update to version 2

## Install

```bash
npm install --save react-form-gear
yarn add react-form-gear
```

## Usage

#define your model with same structure

```tsx
const LoginFormState = {
  email: {
    value: "",
    isValid: true,
    errorMessage: "",
    constraints: [
      { type: "required", message: "Email is Required" },
      { type: "email", message: "email incorrect" }
    ]
  },
  password: {
    value: "",
    isValid: true,
    errorMessage: "",
    constraints: [
      { type: "required", message: "Password is Required" },
      {
        type: "minLength",
        data: { min: 8 },
        message: "password must be 8 charactor"
      }
    ]
  },
  //Dynamic Function Validation
  fourDigit: {
    value: "",
    isValid: true,
    errorMessage: "",
    constraints: [
      { type: "required", message: "FourDigit is Required" },
      {
        type: "onlyFourDigit",
        message: "only four digit",
        validateFunction: {
          onlyFourDigit: value => {
            return value.length == 4 ? true : false;
          }
        }
      }
    ]
  }
};
```

```tsx
import React from "react";

import useformGear from "react-form-gear";

const Example = () => {
  const {
    handleChange,
    handleSubmit,
    fields,
    isValidForm,
    isSubmitting
  } = useformGear({
    formFields: LoginFormState,
    afterSubmit: isValid => {
      //Get is form Valid
      //do after submit valid form
    }
  });
  return (
    <div>
      <h1>React Form Gear</h1>
      <input
        placeholder="email"
        value={fields.email.value}
        onChange={handleChange}
        name={"email"}
      />
      {fields.email.isValid ? null : fields.email.message}
      <input
        placeholder="password"
        value={fields.password.value}
        onChange={handleChange} //must
        name={"password"} //must
      />
      {fields.password.isValid ? null : fields.password.message}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
```

```
test drive https://codesandbox.io/s/react-form-gear-1p0z9
```

## Constraints Types Available

| Types     |
| :-------- |
| required  |
| email     |
| minLength |
| url       |
| numbers   |
| letters   |
| username  |

more will be add

> You can add your own validation using dynamic function validation <+>
> function should return only true or false

```tsx
 fourDigit: {
    value: "",
    isValid: true,
    errorMessage: "",
    constraints: [
      { type: "required", message: "FourDigit is Required" },
      {
        type: "onlyFourDigit",
        message: "only four digit",
        validateFunction: {//<+>
          onlyFourDigit: value => {
            return value.length == 4 ? true : false;
          }
        }
      }
    ]
  }
```

#Any Suggestions and improvement are welcome
