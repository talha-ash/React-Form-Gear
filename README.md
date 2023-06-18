# react-form-gear

> Simple hook for handling form in simple way fully typed

[![NPM](https://img.shields.io/npm/v/react-form-gear)](https://www.npmjs.com/package/react-form-gear) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> react 18.0 or higher

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
      { type: "email", message: "email incorrect" },
    ],
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
        message: "password must be 8 charactor",
      },
    ],
  },
  //Dynamic Function Validation
  zipCode: {
    value: "",
    isValid: true,
    errorMessage: "",
    constraints: [
      { type: "required", message: "zipCode is Required" },
      {
        type: "onlyFourDigit",
        message: "Must four digit",
        validateFunction: {
          onlyFourDigit: (value) => {
            return value.length === 4 ? true : false;
          },
        },
      },
    ],
  },
};
```

```tsx
import React from "react";

import useformGear from "react-form-gear";

function App() {
  const { handleChange, handleSubmit, fields, isValidForm, isSubmitting } =
    useformGear({
      formFields: LoginFormState, //use Your Model
      //immediateError: true, --show Error as user start write input
      afterSubmit: (isValid) => {
        //Get is form Valid
        //do after submit valid form
        if (isValid) {
          alert("Form Submit");
        } else {
          alert("Not Valid");
        }
      },
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
      {fields.email.isValid ? null : <h1>{fields.email.errorMessage}</h1>}
      <input
        placeholder="password"
        value={fields.password.value}
        onChange={handleChange} //must
        name={"password"} //must
      />
      {fields.password.isValid ? null : <h1>{fields.password.errorMessage}</h1>}
      <input
        placeholder="Zip Code"
        value={fields.zipCode.value}
        onChange={handleChange} //must
        name={"zipCode"} //must
      />
      {fields.zipCode.isValid ? null : <h1>{fields.zipCode.errorMessage}</h1>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

```
test drive https://codesandbox.io/s/react-form-gear-demo-qr9gu6
```
## With Types
Infer type from given model(But need to follow model structure strictly)
Now fields have fully types

>Type of fields from above example is 
`ts
  const fields: {
    email: {
        value: string;
        isValid: boolean;
        errorMessage: string;
        constraints: {
            type: string;
            message: string;
        }[];
    };
    password: {
        value: string;
        isValid: boolean;
        errorMessage: string;
        constraints: ({
            ...;
        } | {
            ...;
        })[];
    };
} & FormFields

`
> We can infer for you if we can 
`tsx 
  useformGear(...)
`

> You can provide generic as args 
`tsx 
  useformGear<typeof LoginFormState>
`

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

> Road Map

Typescript Support(Partial Done)

Yup & Zod validator Support

Minor Tweaks

> Any Suggestions and improvement are welcome
