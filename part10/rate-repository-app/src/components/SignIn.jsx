import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  View,
} from "react-native";
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 12,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: theme.colors.textSecondary,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={[styles.input, formik.errors.username && styles.inputError]}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
        {formik.errors.username && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.username}
          </Text>
        )}
      </View>

      <View>
        <TextInput
          style={[styles.input, formik.errors.password && styles.inputError]}
          placeholder="Password"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        {formik.errors.password && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.password}
          </Text>
        )}
      </View>

      <Button title="Sign in" onPress={formik.handleSubmit} />
    </SafeAreaView>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
