import { Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeIntro = () => {
  return (
    <section className="background">
      <Stack className="welcome-container">
        <div className="hero-text-container">
          <h1 className="hero-title">WELCOME TO BOOKBATCH</h1>
          <p className="hero-text">
            Creating connections between the books you love
          </p>
        </div>
        <Link to="/register">
          <Button variant="outline-primary" className="sign-up-btn">
            Sign up now
          </Button>
        </Link>
      </Stack>
    </section>
  );
};

export default HomeIntro;
