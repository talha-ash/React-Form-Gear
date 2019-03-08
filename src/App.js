import React, { Component } from "react";
import "./App.css";
import Home from "./component/Home";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Home fields={LeadFields} />
      </div>
    );
  }
}

export default App;

const LeadFields = {
  password: {
    value: "",
    error: false,
    constraints: {
      REQUIRED: {
        errorMessage: "Password is Required"
      },
      LENGTH: {
        errorMessage: "Password is Too Short"
      }
    },
    currentMessage: ""
  },

  email: {
    value: "",
    error: false,
    constraints: {
      REQUIRED: {
        errorMessage: "Email is Required"
      },
      EMAIL: {
        errorMessage: "Email is Invalid"
      }
    },
    currentMessage: ""
  }
};
