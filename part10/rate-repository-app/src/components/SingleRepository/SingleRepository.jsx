import { View, Text, FlatList } from "react-native";
import React from "react";
import { useParams } from "react-router-native";
import useSingleRepo from "../../hooks/useSingleRepo";
import RepositoryItem from "../RepositoryItem";
import ReviewItem from "./ReviewItem";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const SingleRepository = () => {
  const { id } = useParams();

  const { repo } = useSingleRepo(id);

  if (!repo)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  const reviewNodes = repo.reviews
    ? repo.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )}
      renderItem={ReviewItem}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={repo} />
          <ItemSeparator />
        </>
      )}
    />
  );
};

export default SingleRepository;
