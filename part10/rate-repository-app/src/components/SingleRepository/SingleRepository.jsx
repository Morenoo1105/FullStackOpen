import { View, Text, FlatList } from "react-native";
import React from "react";
import { useParams } from "react-router-native";
import useSingleRepo from "../../hooks/useSingleRepo";
import RepositoryItem from "../RepositoryItem";
import ReviewItem from "./ReviewItem";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const SingleRepository = () => {
  const { id } = useParams();

  const { repository, fetchMore } = useSingleRepo(id, 3);

  const onEndReach = () => {
    fetchMore();
  };

  if (!repository)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={ReviewItem}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={repository} />
          <ItemSeparator />
        </>
      )}
      onEndReached={onEndReach}
    />
  );
};

export default SingleRepository;
