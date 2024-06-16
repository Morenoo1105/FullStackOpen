import { useSelector } from "react-redux";

const Notification = () => {
  const { notification } = useSelector((state) => state.notification);

  if (!notification || notification.message === "") return null;

  return (
    <div
      className={`${notification.type === "success" ? "bg-emerald-400" : "bg-rose-400"} px-4 py-2 rounded-xl w-full text-white font-bold mb-4`}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
