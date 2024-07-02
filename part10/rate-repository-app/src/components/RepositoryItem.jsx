import { View, Image, StyleSheet } from "react-native";
import React from "react";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: 15,
  },
  main: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  mainText: {
    color: theme.colors.textPrimary,
    lineHeight: 32,
  },
  secondaryText: {
    color: theme.colors.textSecondary,
  },
  boxedText: {
    width: "auto",
    backgroundColor: theme.colors.primary,
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  underItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  underItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const UnderItem = ({ value, text }) => {
  return (
    <View style={styles.underItem}>
      <Text style={styles.mainText} fontWeight="bold" fontSize="subheading">
        {value >= 1000 ? parseFloat((value / 1000).toFixed(1)) + "k" : value}
      </Text>
      <Text style={styles.secondaryText} fontWeight="normal" fontSize="body">
        {text}
      </Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = item;
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.main}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: ownerAvatarUrl,
            }}
          />
        </View>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Text style={styles.mainText} fontWeight="bold" fontSize="subheading">
            {fullName}
          </Text>
          <Text
            style={styles.secondaryText}
            fontWeight="normal"
            fontSize="body"
          >
            {description}
          </Text>
          <Text style={styles.boxedText} fontWeight="bold" fontSize="body">
            {language}
          </Text>
        </View>
      </View>
      <View style={styles.underItems}>
        <UnderItem value={stargazersCount} text="Stars" />
        <UnderItem value={forksCount} text="Forks" />
        <UnderItem value={reviewCount} text="Reviews" />
        <UnderItem value={ratingAverage} text="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
