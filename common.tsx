import { StyleSheet } from "react-native";

export const CommonStyle = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  button: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
  },
});

export const colors = {
  primary: "#2C6975",
  secondary: "#68B2A0",
  third: "#CDE0C9",
  sub: "#E0ECDE",
};

export const fonts = {
  XLarge: 32,
  Large: 24,
  medium: 16,
  small: 12,
};
