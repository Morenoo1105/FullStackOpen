import { Pressable } from "react-native";
import React from "react";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ text, route }) => {
  return (
    <Link
      to={route}
      component={Pressable}
      style={{ paddingVertical: 12, paddingHorizontal: 6 }}
    >
      <Text style={{ color: "white" }} fontWeight="bold">
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
