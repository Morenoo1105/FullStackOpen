import { useQuery } from "@apollo/client";

import { GET_SINGLE_REPO } from "../graphql/queries";

const useSingleRepo = (id, first) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_SINGLE_REPO, {
    variables: { id, first },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        variables: { id, first },
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useSingleRepo;
