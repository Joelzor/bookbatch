import { Container } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";

const Saved = () => {
  const { loggedInUser } = useGlobalContext();

  console.log(loggedInUser);
  return (
    <Container>
      <h4 className="mt-4 mb-4 text-center">My Saved Batches</h4>
    </Container>
  );
};

export default Saved;
