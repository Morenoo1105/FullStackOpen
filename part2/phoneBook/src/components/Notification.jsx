const Notification = ({ message }) => {
  const notificationStyle = {
    color: message.error ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "fit-content",
  };

  return <div style={notificationStyle}>{message.message}</div>;
};

export default Notification;
