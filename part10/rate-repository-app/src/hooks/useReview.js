import { useMutation } from "@apollo/client";

import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const reviewCreation = async ({ review }) => {
    const mutateData = await mutate({ variables: { review } });
    return mutateData;
  };

  return [reviewCreation, result];
};

export default useReview;
