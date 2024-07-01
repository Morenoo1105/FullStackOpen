import { SafeAreaView, TextInput, StyleSheet, Button } from "react-native";
import theme from "../theme";
import { useFormik } from "formik";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: theme.colors.textSecondary,
  },
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      <Button title="Sign in" onPress={formik.handleSubmit} />
    </SafeAreaView>
  );
};

export default SignIn;
