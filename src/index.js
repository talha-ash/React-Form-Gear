// import React from "react";
// import ReactDom from "react-dom";
import useformGear from "./customeHook/formGear";

// const formInitialField = {
//   value: "",
//   isValid: true,
//   errorMessage: ""
// };

// export const LoginFormState = {
//   email: {
//     ...formInitialField,
//     constraints: [
//       { type: "required", message: "Email is Required" },
//       { type: "email", message: "email incorrect" }
//     ]
//   },
//   password: {
//     ...formInitialField,
//     constraints: [
//       { type: "required", message: "Password is Required" },
//       {
//         type: "minLength",
//         data: { min: 8 },
//         message: "password must be 8 charactor"
//       }
//     ]
//   }
// };

// const App = () => {
//   const handleFormSubmit = () => {
//     alert("Submit");
//   };
//   const { handleChange, handleSubmit, fields } = useformGear({
//     formFields: LoginFormState,
//     afterSubmit: handleFormSubmit
//   });

//   return (
//     <div>
//       <h1>Hello World</h1>
//       <input
//         placeholder="email"
//         value={fields.email.value}
//         onChange={handleChange}
//         name={"email"}
//       />
//       {fields.email.isValid ? null : "Error in Email"}
//       <input
//         placeholder="password"
//         value={fields.password.value}
//         onChange={handleChange}
//         name={"password"}
//       />
//       {fields.password.isValid ? null : "Password"}

//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// ReactDom.render(<App />, document.getElementById("app"));
export default useformGear;
