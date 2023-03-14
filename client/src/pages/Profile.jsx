import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Col, Row, Stack, Button } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";
import "../styles/profile.css";
import noProfilePic from "../images/no-profile-pic.jpg";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { getUser, loggedInUser } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // error handling needs doing
    if (id) {
      getUser(id)
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, [getUser, id]);

  const navigateToEdit = () => navigate(`/profile/edit/${id}`);

  return (
    <Container>
      {user && (
        <>
          <h3 className="text-center mt-4">{user.username}</h3>
          <Stack direction="horizontal" className="justify-content-center mt-4">
            {user?.profile?.profileImg && (
              <img
                src={user?.profile?.profileImg}
                alt="Profile pic"
                className="profile-pic"
              />
            )}
            {!user?.profile?.profileImg && (
              <img
                src={noProfilePic}
                alt="Stock profile pic"
                className="profile-pic"
              />
            )}
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
                  <h5>{user?.profile?.firstName || "N/A"}</h5>
                  <h5>{user?.profile?.lastName || "N/A"}</h5>
                  <h5>{user?.batches.length || "No batches created!"}</h5>
                </Stack>
              </Col>
            </Row>
            <Row className="mt-4 profile-bio">
              <h5>Bio:</h5>
              <p>{user?.profile?.bio || "This user has no bio"}</p>
            </Row>
            {user && loggedInUser && loggedInUser.id === user.id && (
              <Stack
                direction="horizontal"
                className="justify-content-center mt-4"
              >
                <Button variant="outline-primary" onClick={navigateToEdit}>
                  Edit Profile
                </Button>
              </Stack>
            )}
          </Container>
        </>
      )}
    </Container>
  );
};

export default Profile;
