import { Container, Col, Row } from "react-bootstrap";
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
            {/* <Row>
              <Col xs={4}>col</Col>
              <Col>col</Col>
            </Row> */}
          </Container>
        </>
      )}
    </Container>
  );
};

export default Profile;
