import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (selectedOrder, searchKeyword, first) => {
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

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword, first },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        variables: { orderDirection, orderBy, searchKeyword, first },
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
