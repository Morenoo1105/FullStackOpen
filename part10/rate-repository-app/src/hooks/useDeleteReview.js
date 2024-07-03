import { useMutation } from "@apollo/client";

import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = async (deleteReviewId) => {
    const mutateData = await mutate({ variables: { deleteReviewId } });
    return mutateData;
  };

  return [deleteReview];
};

export default useDeleteReview;
