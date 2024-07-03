import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const useIsSignedIn = (reviews = false) => {
  const [user, setUser] = useState();

  const { data, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: reviews },
  });

  useEffect(() => {
    if (data) setUser(data.me);
  }, [data]);

  return { user, refetch };
};

export default useIsSignedIn;
