import Alert from "react-bootstrap/Alert";

const Notification = ({ message, type }) => {
  return (
    <Alert className="mt-4" variant={type}>
      {message}
    </Alert>
  );
};

export default Notification;
