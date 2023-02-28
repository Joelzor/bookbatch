import { useState } from "react";
import { Button, Form, Row, Stack, Container } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useGlobalContext();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = register(userData);
    setSuccess(result);
    setUserData({
      username: "",
      email: "",
      password: "",
    });

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <Container className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <h4 className="text-center mt-4">
        Sign up now to create your own batches!
      </h4>
      <Form className="w-50 mx-auto mt-5" onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
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
                value={userData.password}
                onChange={handleChange}
                minLength="8"
                maxLength="25"
              />
            </Form.Group>
          </Row>
          <Button type="submit">Sign me up</Button>
        </Stack>
      </Form>
      {success && (
        <Notification message={"You signed up successfully!"} type="success" />
      )}
    </Container>
  );
};

export default Register;
