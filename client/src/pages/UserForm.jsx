import { useState } from "react";
import { Button, Form, Row, Stack, Container } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import bookStack from "../images/book-stack.jpg";

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
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);
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

    if (result.status === "fail") {
      setErrorResponse(result.message);
    }

    if (result.status === "success") {
      setSuccessResponse(result.message);
    }

    setRegisterData({
      username: "",
      email: "",
      password: "",
    });

    if (result.status === "success") {
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const result = await userLogin(loginData);
    if (result.status === "fail") {
      setErrorResponse(result.message);
    }

    if (result.status === "success") {
      setSuccessResponse(result.message);
    }

    setLoginData({
      email: "",
      password: "",
    });

    if (result.status === "success") {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  };

  const removeAlert = () => {
    setTimeout(() => {
      setSuccessResponse(null);
      setErrorResponse(null);
    }, 2000);
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
          <Button type="submit" className="mb-4">
            {!login && "Sign me up"}
            {login && "Log me in"}
          </Button>
        </Stack>
      </Form>
      {successResponse && (
        <>
          <Notification message={successResponse} type="success" />
          {removeAlert()}
        </>
      )}
      {errorResponse && (
        <>
          <Notification message={errorResponse} type="secondary" />
          {removeAlert()}
        </>
      )}
      {login && (
        <img
          src={bookStack}
          alt="stack of books artwork"
          style={{ height: "150px", width: "auto", marginTop: "40px" }}
        />
      )}
    </Container>
  );
};

export default UserForm;
