import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { fonts } from "../common";

type KeyboardProps = {
  buttonText: string | JSX.Element;
  changeText: (numberText: string) => void;
};

export default function Keyboard({ buttonText, changeText }: KeyboardProps) {
  const renderText = typeof buttonText === "string" ? buttonText : "";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeText(renderText)}
      >
        <Text style={texts.button}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const texts = StyleSheet.create({
  button: {
    fontSize: fonts.Subline,
  },
});
