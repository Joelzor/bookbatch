import { useState } from "react";
import { Button, Form, Row, Stack, Container } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";

const UserForm = ({ login = false }) => {
  const { register, userLogin } = useGlobalContext();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;

    setRegisterData({ ...registerData, [name]: value });
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    const result = await register(registerData);
    setSuccess(result);
    setRegisterData({
      username: "",
      email: "",
      password: "",
    });

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    userLogin(loginData);

    setLoginData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Container className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <h4 className="text-center mt-4">
        {!login && "Sign up now to create your own batches!"}
        {login && "Log in"}
      </h4>
      <Form
        className="w-50 mx-auto mt-5"
        onSubmit={login ? handleSubmitLogin : handleSubmitRegister}
      >
        <Stack gap={4}>
          {!login && (
            <Row>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  name="username"
                  value={registerData.username}
                  onChange={handleChangeRegister}
                />
              </Form.Group>
            </Row>
          )}
          <Row>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                name="email"
                type="email"
                value={login ? loginData.email : registerData.email}
                onChange={login ? handleChangeLogin : handleChangeRegister}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                type="password"
                value={login ? loginData.password : registerData.password}
                onChange={login ? handleChangeLogin : handleChangeRegister}
                minLength="8"
                maxLength="25"
              />
            </Form.Group>
          </Row>
          <Button type="submit">
            {!login && "Sign me up"}
            {login && "Log me in"}
          </Button>
        </Stack>
      </Form>
      {success && (
        <Notification message={"You signed up successfully!"} type="success" />
      )}
    </Container>
  );
};

export default UserForm;
