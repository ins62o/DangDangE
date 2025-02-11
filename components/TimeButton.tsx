import { Dispatch, SetStateAction, useState } from "react";
import { Platform, Pressable, StyleSheet, Text } from "react-native";
import { colors, fonts, MyText } from "../common";
import { useRecoilState } from "recoil";
import { Blood, userBloodData } from "../Atoms/bloodData";
import { times } from "../InitialData";

type TimeButtonProps = {
  title: string;
};

export default function TimeButton({ title }: TimeButtonProps) {
  const [blood, setBlood] = useRecoilState<Blood>(userBloodData);
  const isClicked = blood.time.includes(title);

  const handleClick = () => {
    setBlood((prev) => {
      const updatedTime = prev.time?.includes(title)
        ? prev.time.filter((item) => item !== title)
        : [...(prev.time ?? []), title];

      const sortedTime = [...updatedTime].sort(
        (a, b) => times.indexOf(a) - times.indexOf(b)
      );

      return { ...prev, time: sortedTime };
    });
  };

  const dynamicStyle = isClicked ? styles.access : styles.disable;
  const dynamicText = isClicked ? texts.accessText : texts.disableText;

  return (
    <Pressable style={[styles.button, dynamicStyle]} onPress={handleClick}>
      <MyText style={dynamicText}>{title}</MyText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
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
    fontSize: fonts.body,
  },
  disableText: {
    fontSize: fonts.body,
    color: colors.Nobel,
  },
});
