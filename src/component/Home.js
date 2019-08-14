import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Button
} from "reactstrap";
import _ from "lodash";
import useFormGear from "../CustomeHook/FormGear/FormGear";
const Home = props => {
  const { handleChange, handleSubmit, fields } = useFormGear(props.fields);
  console.log(fields);
  return (
    <div className="container">
      <div className="form-box">
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              onChange={handleChange}
              name="email"
              value={fields.email.value}
            />
            {fields.email.error ? <h1>{fields.email.currentMessage}</h1> : null}
            <FormFeedback valid>Sweet! Email</FormFeedback>
            <FormText>Email Should Be Business Type</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              onChange={handleChange}
              name="password"
              value={fields.password.value}
            />
            {fields.password.error ? (
              <h1>{fields.password.currentMessage}</h1>
            ) : null}
          </FormGroup>
          <Button color="success" onClick={handleSubmit}>
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Home;
