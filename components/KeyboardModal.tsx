import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { colors, CommonStyle, fonts } from "../common";
import Keyboard from "./Keyboard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Blood, userBloodData } from "../Atoms/bloodData";
import { useRecoilState } from "recoil";

type keyboardProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  type: string;
};

export default function KeyboardModal({
  setIsModal,
  title,
  type,
}: keyboardProps) {
  const [blood, setBlood] = useRecoilState<Blood>(userBloodData);

  const slide = useRef(new Animated.Value(600));
  const slideUp = () => {
    Animated.timing(slide.current, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slide.current, {
      toValue: 600,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideUp();
  }, []);

  const [text, setText] = useState("0");
  const back: JSX.Element = (
    <FontAwesome5 name="backspace" size={24} color="black" />
  );
  const changeText = (numberText: string) =>
    setText((prev) => (prev === "0" ? numberText : prev + numberText));

  const deleteText = () => {
    setText((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const clearText = () => setText("0");

  const handleSave = () => {
    const index = blood.time.indexOf(title);
    setBlood((prev) => ({
      ...prev,
      goal: {
        ...prev.goal,
        [index]:
          type === "min"
            ? [+text, prev.goal[index][1]]
            : [prev.goal[index][0], +text],
      },
    }));

    setIsModal(false);
  };

  const closeModal = () => {
    slideDown();
    setTimeout(() => {
      setIsModal(false);
    }, 800);
  };

  return (
    <Pressable style={styles.container} onPress={closeModal}>
      <Animated.View
        style={[
          styles.keyboardContainer,
          { transform: [{ translateY: slide.current }] },
        ]}
      >
        <Pressable style={styles.noneEventContainer}>
          <View style={styles.titleContainer}>
            <Text style={texts.title}>목표 혈당을 입력해주세요.</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={texts.view}>{text}</Text>
          </View>
          <View style={styles.keyContainer}>
            <View style={styles.numberContainer}>
              <Keyboard buttonText="1" changeText={changeText} />
              <Keyboard buttonText="2" changeText={changeText} />
              <Keyboard buttonText="3" changeText={changeText} />
            </View>
            <View style={styles.numberContainer}>
              <Keyboard buttonText="4" changeText={changeText} />
              <Keyboard buttonText="5" changeText={changeText} />
              <Keyboard buttonText="6" changeText={changeText} />
            </View>
            <View style={styles.numberContainer}>
              <Keyboard buttonText="7" changeText={changeText} />
              <Keyboard buttonText="8" changeText={changeText} />
              <Keyboard buttonText="9" changeText={changeText} />
            </View>
            <View style={styles.numberContainer}>
              <Keyboard buttonText="C" changeText={clearText} />
              <Keyboard buttonText="0" changeText={changeText} />
              <Keyboard buttonText={back} changeText={deleteText} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[CommonStyle.button, styles.custombutton]}
              onPress={handleSave}
            >
              <Text style={texts.button}>저장</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },

  keyboardContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: colors.WhiteSmoke,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },

  titleContainer: {
    flex: 0.15,
    justifyContent: "center",
  },

  viewContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },

  keyContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },

  custombutton: {
    width: "90%",
    height: 50,
    backgroundColor: colors.Main,
  },

  numberContainer: {
    width: "90%",
    height: "25%",
    flexDirection: "row",
  },

  noneEventContainer: {
    flex: 1,
  },
});

const texts = StyleSheet.create({
  title: {
    fontSize: fonts.Headline,
    textAlign: "center",
  },

  button: {
    color: "#fff",
  },

  view: {
    fontSize: fonts.Headline,
    color: colors.DimGrey,
  },
});
