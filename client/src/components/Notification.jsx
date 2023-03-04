import Alert from "react-bootstrap/Alert";

const Notification = ({ message, type }) => {
  return <Alert variant={type}>{message}</Alert>;
};

export default Notification;
