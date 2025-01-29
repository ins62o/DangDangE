import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { colors, CommonStyle, fonts } from "../common";
import Keyboard from "./Keyboard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type keyboardProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function KeyboardModal({ setIsModal }: keyboardProps) {
  const windowHeight = useWindowDimensions().height;
  console.log(windowHeight);
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
    setText((prev) => prev + numberText);

  const closeModal = () => {
    slideDown();
    setTimeout(() => {
      setIsModal(false);
    }, 800);
  };

  return (
    <Pressable style={styles.container} onPress={closeModal}>
      <Pressable></Pressable>
      <Animated.View
        style={[
          styles.keyboardContainer,
          { transform: [{ translateY: slide.current }] },
        ]}
      >
        <Pressable style={styles.noneEventContainer}>
          <View style={styles.titleContainer}>
            <Text style={texts.title}>식전 혈당(공복)</Text>
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
              <Keyboard buttonText="C" changeText={changeText} />
              <Keyboard buttonText="8" changeText={changeText} />
              <Keyboard buttonText={back} changeText={changeText} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[CommonStyle.button, styles.custombutton]}>
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
    color: colors.Nobel,
  },
});
