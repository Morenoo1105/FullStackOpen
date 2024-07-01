import { View, StyleSheet, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

import useIsSignedIn from "../hooks/useIsSignedIn";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 4,
    paddingHorizontal: 12,
    backgroundColor: theme.backgroundColors.appBar,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

const AppBar = () => {
  const { user } = useIsSignedIn();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={"Repositories"} route={"/"} />
        {user ? (
          <AppBarTab text={"Sign Out"} route={"/signout"} />
        ) : (
          <AppBarTab text={"Sign In"} route={"/signin"} />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
