import { Pressable, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { colors } from "../common";

type TimeButtonProps = {
  title: string;
};

export default function TimeButton({ title }: TimeButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => setIsClicked((prev) => !prev);

  const dynamicStyle = isClicked ? styles.access : styles.disable;
  const dynamicText = isClicked ? texts.accessText : texts.disableText;

  return (
    <Pressable style={[styles.button, dynamicStyle]} onPress={handleClick}>
      <Text style={dynamicText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 40,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  access: {
    backgroundColor: colors.Sub2,
  },
  disable: {
    backgroundColor: "#fff",
  },
});

const texts = StyleSheet.create({
  accessText: {
    color: "black",
  },
  disableText: {
    color: colors.Nobel,
  },
});
