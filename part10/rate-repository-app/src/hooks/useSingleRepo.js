import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_SINGLE_REPO } from "../graphql/queries";

const useSingleRepo = (id) => {
  const [repo, setRepo] = useState();
  const { data, error, loading } = useQuery(GET_SINGLE_REPO, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) setRepo(data.repository);
  }, [loading]);

  return { repo, loading };
};

export default useSingleRepo;
