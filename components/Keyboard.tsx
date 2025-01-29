import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { colors, fonts } from "../common";

type KeyboardProps = {
  buttonText: string | JSX.Element;
  changeText: (numberText: string) => void;
};

export default function Keyboard({ buttonText, changeText }: KeyboardProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
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
