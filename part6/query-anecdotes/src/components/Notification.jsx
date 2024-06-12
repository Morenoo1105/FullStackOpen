import { useContext, useEffect } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch("");
      }, 5000);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
