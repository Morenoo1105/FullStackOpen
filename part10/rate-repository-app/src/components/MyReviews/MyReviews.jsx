import { View, FlatList, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import useIsSignedIn from "../../hooks/useIsSignedIn";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../../hooks/useDeleteReview";

import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: 15,
    gap: 15,
    flex: 1,
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    gap: 15,
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
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
});

const ItemSeparator = () => <View style={{ height: 10 }} />;

const ReviewItem = ({ item, navigate, setDeleteReviewId }) => {
  const { id, createdAt, rating, text, repository } = item;
  const { fullName, id: repoId } = repository;

  const date = new Date(createdAt).toLocaleDateString("en-GB");

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.ratingCircle}>
          <Text color="primary" fontWeight="bold">
            {rating}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text fontWeight="bold">{fullName}</Text>
          <Text color="secondary">{date}</Text>
          <Text>{text}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <Button
            color={theme.colors.primary}
            title="View repository"
            onPress={() => navigate(`/repository/${repoId}`)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            color={theme.colors.error}
            title="Delete review"
            onPress={() => {
              Alert.alert(
                "Delete review",
                "Are you sure you want to delete this review?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "DELETE",
                    onPress: () => setDeleteReviewId(id),
                  },
                ]
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { user, refetch } = useIsSignedIn(true);
  const navigate = useNavigate();

  const [deleteReview] = useDeleteReview();
  const [deleteReviewId, setDeleteReviewId] = useState(null);

  const reviewNodes = user ? user.reviews.edges.map((edge) => edge.node) : [];

  useEffect(() => {
    const deleting = async () => {
      if (!deleteReviewId) return;
      try {
        await deleteReview(deleteReviewId);
        await refetch();
        setDeleteReviewId(null);
      } catch (e) {
        console.log(e);
      }
    };
    deleting();
  }, [deleteReviewId]);

  if (!user)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem
          item={item}
          navigate={navigate}
          setDeleteReviewId={setDeleteReviewId}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
