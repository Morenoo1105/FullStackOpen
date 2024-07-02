import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { Component, useState } from "react";
import { useDebounce } from "use-debounce";
import { Searchbar } from "react-native-paper";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const RepositoryListHeader = ({
  selectedOrder,
  setSelectedOrder,
  searchFilter,
  setSearchFilter,
}) => {
  return (
    <View>
      <Searchbar
        placeholder="Search"
        value={searchFilter}
        onChangeText={setSearchFilter}
      />
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(value) => setSelectedOrder(value)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export class RepositoryListContainer extends Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <RepositoryListHeader
        selectedOrder={props.selectedOrder}
        setSelectedOrder={props.setSelectedOrder}
        searchFilter={props.searchFilter}
        setSearchFilter={props.setSearchFilter}
      />
    );
  };

  render() {
    const props = this.props;

    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        style={{ width: "100%" }}
        data={repositoryNodes}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => props.navigate(`/repository/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    );
  }
}

/*
export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const navigate = useNavigate();

  return (
    <FlatList
      style={{ width: "100%" }}
      data={repositoryNodes}
      ListHeaderComponent={() => (
        <RepositoryListHeader
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};
*/

const RepositoryList = () => {
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState("latest");
  const [searchFilter, setSearchFilter] = useState("");
  const [searchTerm] = useDebounce(searchFilter, 500);

  const { repositories } = useRepositories(selectedOrder, searchTerm);

  return (
    <RepositoryListContainer
      navigate={navigate}
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchFilter={searchFilter}
      setSearchFilter={setSearchFilter}
    />
  );
};

export default RepositoryList;
