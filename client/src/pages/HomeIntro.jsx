import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeIntro = () => {
  return (
    <section className="background">
      <div className="welcome-container">
        <h1 className="hero-title">WELCOME TO BOOKBATCH</h1>
        <Link to="/register">
          <Button variant="primary" className="sign-up-btn">
            Sign up now
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HomeIntro;
