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
import useReview from "../hooks/useReview";
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
  owner: yup.string().required("Repository owner name is required"),
  name: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .required("Rating is required")
    .integer()
    .min(0, "Rating must be an integer between 0 and 100.")
    .max(100, "Rating must be an integer between 0 and 100."),
  reviewText: yup.string().optional(),
});

const ReviewForm = () => {
  const [createReview] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { owner, name, rating, reviewText } = values;

    try {
      const review = {
        ownerName: owner,
        repositoryName: name,
        rating: parseInt(rating),
        text: reviewText,
      };

      const { data } = await createReview({ review });
      console.log(data);
      navigate("/repository/" + data.createReview.repositoryId);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      owner: "",
      name: "",
      rating: "",
      reviewText: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={[styles.input, formik.errors.owner && styles.inputError]}
          placeholder="Repository owner name"
          value={formik.values.owner}
          onChangeText={formik.handleChange("owner")}
        />
        {formik.errors.owner && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.owner}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          style={[styles.input, formik.errors.name && styles.inputError]}
          placeholder="Repository name name"
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
        />
        {formik.errors.name && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.name}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          style={[styles.input, formik.errors.rating && styles.inputError]}
          placeholder="Rating (0-100)"
          value={formik.values.rating}
          onChangeText={formik.handleChange("rating")}
        />
        {formik.errors.rating && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.rating}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          multiline
          style={[styles.input, formik.errors.reviewText && styles.inputError]}
          placeholder="Review (optional)"
          value={formik.values.reviewText}
          onChangeText={formik.handleChange("reviewText")}
        />
        {formik.errors.reviewText && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.reviewText}
          </Text>
        )}
      </View>

      <Button title="Create review" onPress={formik.handleSubmit} />
    </SafeAreaView>
  );
};

export default ReviewForm;
