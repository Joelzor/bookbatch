import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Row, Col, Stack, Button } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";

const EditProfile = () => {
  const [userData, setUserData] = useState(null);
  const { getUser, updateProfile } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // error handling needs doing
    if (id) {
      getUser(id)
        .then((data) => {
          setUserData({
            firstName: data?.profile.firstName,
            lastName: data?.profile.lastName,
            bio: data?.profile.bio,
            profileImg: data?.profile.profileImg,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [getUser, id]);

  // navigate user away if logged in id doesn't match the params

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile(userData, id);

    navigate(`/profile/${id}`);
  };

  return (
    <>
      <h3 className="mt-4 text-center">Edit your profile!</h3>
      {userData && (
        <Container>
          <Form className="mt-4" onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Stack gap={2}>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                  />
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                  />
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    name="profileImg"
                    placeholder="Enter image URL"
                    value={userData.profileImg}
                    onChange={handleChange}
                  />
                </Stack>
              </Col>
              <Col>
                <Form.Label>Biography</Form.Label>
                <Form.Control
                  name="bio"
                  as="textarea"
                  rows={8.5}
                  value={userData.bio}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Stack
                direction="horizontal"
                className="justify-content-center mt-4"
              >
                <Button variant="outline-primary" type="submit">
                  Submit
                </Button>
              </Stack>
            </Row>
          </Form>
        </Container>
      )}
    </>
  );
};

export default EditProfile;
