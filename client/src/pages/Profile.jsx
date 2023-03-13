import { Container, Col, Row, Stack } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";
import "../styles/profile.css";

const Profile = () => {
  const { loggedInUser } = useGlobalContext();

  console.log(loggedInUser);

  return (
    <Container>
      {loggedInUser && (
        <>
          <h3 className="text-center mt-4">{loggedInUser.username}</h3>
          <Container>
            <Row>
              <Col>
                <Stack>
                  <h5>First name:</h5>
                  <h5>Last name:</h5>
                  <h5>Batches created:</h5>
                </Stack>
              </Col>
              <Col>
                <Stack></Stack>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </>
      )}
    </Container>
  );
};

export default Profile;
