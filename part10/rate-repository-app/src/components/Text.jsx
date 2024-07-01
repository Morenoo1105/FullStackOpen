import { Text as NativeText, StyleSheet, Platform } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: Platform.select({
      default: theme.fonts.default,
      ios: theme.fonts.ios,
      android: theme.fonts.android,
    }),
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextError: {
    color: theme.colors.textError,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  backgroundColorPrimary: {
    backgroundColor: theme.colors.primary,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  backgroundColor,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === "primary" && styles.colorPrimary,
    color === "secondary" && styles.colorTextSecondary,
    color === "errorColor" && styles.colorTextError,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    style,
    backgroundColor === "backgroundPrimary" && styles.backgroundColorPrimary,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
