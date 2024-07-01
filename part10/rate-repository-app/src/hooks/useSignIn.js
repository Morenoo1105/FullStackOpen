import { useMutation, useApolloClient } from "@apollo/client";
import { AUTH_USER } from "../graphql/mutations";

import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTH_USER);

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const item = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(item.data.authenticate.accessToken);
    apolloClient.resetStore();
    return item;
  };
  return [signIn, result];
};

export default useSignIn;
