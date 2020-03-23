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
//   },
//   fourDigit: {
//     ...formInitialField,
//     constraints: [
//       { type: "required", message: "FourDigit is Required" },
//       {
//         type: "onlyFourDigit",
//         message: "only four digit",
//         validateFunction: {
//           onlyFourDigit: value => {
//             return value.length == 4 ? true : false;
//           }
//         }
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
//       {fields.password.isValid ? null : fields.password.errorMessage}
//       <input
//         placeholder="four digit"
//         value={fields.fourDigit.value}
//         onChange={handleChange}
//         name={"fourDigit"}
//       />
//       {fields.fourDigit.isValid ? null : fields.fourDigit.errorMessage}
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// ReactDom.render(<App />, document.getElementById("app"));
export default useformGear;
