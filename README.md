# react-form-gear

> Simple hook for handling form in simple way (alpha)

[![NPM](https://img.shields.io/npm/v/use-interval.svg)](https://www.npmjs.com/package/react-form-gear) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-form-gear
yarn add react-form-gear
```

## Usage

#define your modal with same structure

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
  }
};
```

```tsx
import React from "react";

import useformGear from "react-form-gear";

const Example = () => {
  const { handleChange, handleSubmit, fields } = useformGear({
    formFields: LoginFormState,
    afterSubmit: () => {
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

#its initial alpha version. Stable verison comes with more feature
