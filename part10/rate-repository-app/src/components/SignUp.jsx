import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import Text from "./Text";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import theme from "../theme";
import { useNavigate } from "react-router-native";

import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

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
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long.")
    .max(30, "Username can be maximum 30 characters long."),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long.")
    .max(50, "Password can be maximum 50 characters long."),
  passwordRepeat: yup
    .string()
    .required("Password repeat is required")
    .oneOf([yup.ref("password"), null], "Passwords do not match."),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      console.log("Signed up and signed in");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordRepeat: "",
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
          secureTextEntry
          style={[styles.input, formik.errors.password && styles.inputError]}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        {formik.errors.password && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.password}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          secureTextEntry
          style={[
            styles.input,
            formik.errors.passwordRepeat && styles.inputError,
          ]}
          placeholder="Repeat password"
          value={formik.values.passwordRepeat}
          onChangeText={formik.handleChange("passwordRepeat")}
        />
        {formik.errors.passwordRepeat && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.passwordRepeat}
          </Text>
        )}
      </View>

      <Button title="Sign up" onPress={formik.handleSubmit} />
    </SafeAreaView>
  );
};

export default SignUp;
