import useSignOut from "../hooks/useSignOut";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";

const SignOut = () => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  useSignOut();

  useEffect(() => {
    apolloClient.resetStore();
    navigate("/signin");
  }, []);
};

export default SignOut;
