import { Container, Col, Row, Stack, Button } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";
import "../styles/profile.css";

const Profile = () => {
  const { loggedInUser } = useGlobalContext();

  return (
    <Container>
      {loggedInUser && (
        <>
          <h3 className="text-center mt-4">{loggedInUser.username}</h3>
          <Stack direction="horizontal" className="justify-content-center mt-4">
            <img
              src={loggedInUser?.profile?.profileImg}
              alt="Profile pic"
              className="profile-pic"
            />
          </Stack>
          <Container className="mt-4 profile-container">
            <Row>
              <Col>
                <Stack>
                  <h5 className="profile-heading">First name:</h5>
                  <h5 className="profile-heading">Last name:</h5>
                  <h5 className="profile-heading">Batches created:</h5>
                </Stack>
              </Col>
              <Col>
                <Stack gap={1}>
                  <h5>{loggedInUser?.profile?.firstName || "N/A"}</h5>
                  <h5>{loggedInUser?.profile?.lastName || "N/A"}</h5>
                  <h5>
                    {loggedInUser?.batches.length || "No batches created!"}
                  </h5>
                </Stack>
              </Col>
              {/* <Col>
                <Button>Edit Profile</Button>
              </Col> */}
            </Row>
            <Row className="mt-4 profile-bio">
              <h5>Bio:</h5>
              <p>{loggedInUser?.profile?.bio}</p>
            </Row>
          </Container>
        </>
      )}
    </Container>
  );
};

export default Profile;
