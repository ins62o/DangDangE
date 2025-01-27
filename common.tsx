import { StyleSheet, Platform } from "react-native";

export const colors = {
  Main: "#2C6975",
  Sub1: "#68B2A0",
  Sub2: "#E0ECDE",
  Point: "#FFDA40",
  Error: "#FF5100",
  Good: "#191554",
  DimGrey: "#646464",
  Nobel: "#979797",
  WhiteSmoke: "#F6F6F6",
};

export const fonts = {
  Headline: Platform.OS === "ios" ? 26 : 18,
  Subline: Platform.OS === "ios" ? 20 : 14,
  body: Platform.OS === "ios" ? 14 : 12,
  description: Platform.OS === "ios" ? 12 : 10,
};

export const CommonStyle = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    width: "80%",
    marginBottom: 25,
    padding: 10,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },

  button: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: colors.Main,
    alignItems: "center",
  },
});
