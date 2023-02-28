import { Button, Form, Row, Stack, Container } from "react-bootstrap";

const Register = () => {
  return (
    <Container className="mt-5">
      <h4 className="text-center mt-4">
        Sign up now to create your own batches!
      </h4>
      <Form className="w-50 mx-auto mt-5">
        <Stack gap={4}>
          <Row>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control required></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email"></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password"></Form.Control>
            </Form.Group>
          </Row>
          <Button type="submit">Sign me up</Button>
        </Stack>
      </Form>
    </Container>
  );
};

export default Register;
