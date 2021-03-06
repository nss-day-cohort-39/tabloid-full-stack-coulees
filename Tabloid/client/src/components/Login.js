import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardHeader, CardBody } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Login() {
  const history = useHistory();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch((err) => {
        console.log(err)
        alert("Invalid email or password")
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="smallContainer">
        <CardHeader>Login</CardHeader>
        <CardBody>
          <Form onSubmit={loginSubmit}>
            <fieldset>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
              </FormGroup>
              <FormGroup className="text-right">
                <Button color="primary">Login</Button>
              </FormGroup>
              <em>
                Not registered? <Link to="register">Register</Link>
              </em>
            </fieldset>
          </Form>
        </CardBody>
      </Card>
    </div>

  );
}