import { View, StyleSheet } from "react-native";
import React from "react";

import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    gap: 15,
    flex: 1,
  },
  ratingCircle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ReviewItem = ({ item }) => {
  const { createdAt, rating, text, user } = item;
  const { username } = user;

  const date = new Date(createdAt).toLocaleDateString("en-GB");

  return (
    <View style={styles.container}>
      <View style={styles.ratingCircle}>
        <Text color="primary" fontWeight="bold">
          {rating}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text fontWeight="bold">{username}</Text>
        <Text color="secondary">{date}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
