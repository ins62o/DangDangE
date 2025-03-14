import { StyleSheet, Platform, Text } from "react-native";

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
  Headline: Platform.OS === "ios" ? 20 : 18,
  Subline: Platform.OS === "ios" ? 18 : 16,
  body: Platform.OS === "ios" ? 16 : 14,
};

export const CommonStyle = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    width: "80%",
    marginBottom: 10,
    paddingLeft: 15,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
    height: Platform.OS === "ios" ? 50 : 45,
  },

  button: {
    width: "100%",
    height: Platform.OS === "ios" ? 50 : 40,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: colors.Main,
    alignItems: "center",
  },
});

export const MyText = ({
  style,
  fontWeight = "Regular",
  children,
  ...props
}: {
  style?: any;
  fontWeight?: "Regular" | "Bold";
  children: React.ReactNode;
}) => {
  const fontMap = {
    Regular: "Pretendard-Regular",
    Bold: "Pretendard-Bold",
  };

  return (
    <Text
      {...props}
      style={[
        style,
        { fontFamily: fontMap[fontWeight] || "Pretendard-Regular" },
      ]}
    >
      {children}
    </Text>
  );
};
