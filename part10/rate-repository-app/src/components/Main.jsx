import { View, StyleSheet } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import theme from "../theme";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SingleRepository from "./SingleRepository/SingleRepository";
import ReviewForm from "./ReviewForm";
import SignUp from "./SignUp";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.main,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/writeReview" element={<ReviewForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
