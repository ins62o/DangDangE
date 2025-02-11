import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Animated,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { colors, CommonStyle } from "../common";

type MemoProps = {
  setIsMemo: React.Dispatch<React.SetStateAction<boolean>>;
  changeText: React.Dispatch<React.SetStateAction<string>>;
  memo: string;
};

export default function MemoModal({ setIsMemo, memo, changeText }: MemoProps) {
  const [text, setText] = useState(memo);

  const slide = useRef(new Animated.Value(600));
  const slideUp = () => {
    Animated.timing(slide.current, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideUp();
  }, []);

  useEffect(() => {
    setText(memo);
  }, [memo]);

  const SaveMemo = () => {
    setIsMemo(false);
    changeText(text);
  };

  return (
    <Pressable style={styles.container}>
      <Animated.View
        style={[
          styles.MemoContainer,
          { transform: [{ translateY: slide.current }] },
        ]}
      >
        <View style={styles.memo}>
          <TextInput
            style={styles.memoBox}
            placeholder="메모를 입력해주세요."
            value={text}
            onChangeText={setText}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={[CommonStyle.button, styles.custom]}
            onPress={SaveMemo}
          >
            <Text style={texts.button}>입력하기</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingTop: 50,
  },

  MemoContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.WhiteSmoke,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },

  memo: {
    flex: 0.3,
    padding: 10,
  },

  memoBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },

  button: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },

  custom: {
    width: "90%",
  },
});

const texts = StyleSheet.create({
  button: {
    color: "#fff",
  },
});
