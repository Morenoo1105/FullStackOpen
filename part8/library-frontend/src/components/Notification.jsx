import { useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";
import { useState } from "react";
import { updateCache } from "../App";
import { ALL_BOOKS } from "./Books";

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const Notification = () => {
  const [notif, setNotif] = useState(null);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      setNotif(`New book added: ${addedBook.title}`);

      setTimeout(() => {
        setNotif(null);
      }, 5000);

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  if (!notif) return null;

  return <div style={{ backgroundColor: "#6CA8", marginTop: 5 }}>{notif}</div>;
};

export default Notification;
