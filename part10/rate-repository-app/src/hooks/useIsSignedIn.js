import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { IS_SIGNED_IN } from "../graphql/queries";

const useIsSignedIn = () => {
  const [user, setUser] = useState();
  const { data } = useQuery(IS_SIGNED_IN, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) setUser(data.me);
  }, [data]);

  return { user };
};

export default useIsSignedIn;
