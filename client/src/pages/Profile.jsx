import { Container } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";

const Profile = () => {
  const { loggedInUser } = useGlobalContext();

  console.log(loggedInUser);

  return (
    <Container>
      <h3 className="text-center mt-4">{loggedInUser.username}</h3>
    </Container>
  );
};

export default Profile;
