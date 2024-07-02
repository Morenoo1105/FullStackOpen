import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (selectedOrder) => {
  const [orderDirection, setOrderDirection] = useState();
  const [orderBy, setOrderBy] = useState();

  useEffect(() => {
    if (!selectedOrder) {
      setOrderDirection("DESC");
      setOrderBy("CREATED_AT");
    } else if (selectedOrder === "highest") {
      setOrderDirection("DESC");
      setOrderBy("RATING_AVERAGE");
    } else if (selectedOrder === "lowest") {
      setOrderDirection("ASC");
      setOrderBy("RATING_AVERAGE");
    } else {
      setOrderDirection("DESC");
      setOrderBy("CREATED_AT");
    }
  }, [selectedOrder]);

  const [repositories, setRepositories] = useState();
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) setRepositories(data.repositories);
  }, [loading]);

  return { repositories, loading };
};

export default useRepositories;
