import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { useState } from "react";
import { colors, CommonStyle, fonts, MyText } from "../../common";
import Keyboard from "../Element/Keyboard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Blood, userBloodData } from "../../atoms/bloodData";
import { useSetRecoilState } from "recoil";
import { BloodData } from "../../pages/RecordBlood";
import { userType } from "../../types/userType";
import { getWeek } from "../../utils/dateFn";
import { useSlideAni } from "../../hooks/animation/useSlideAni";

type keyboardProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBloodData?: React.Dispatch<React.SetStateAction<BloodData | null>>;
  title?: string;
  type?: string;
  mode?: string;
  userData?: userType | null;
};

export default function KeyboardModal({
  setIsModal,
  setBloodData,
  title,
  type,
  mode,
  userData,
}: keyboardProps) {
  const setBlood = useSetRecoilState<Blood>(userBloodData);
  const { slide, slideTo } = useSlideAni();
  const [text, setText] = useState("0");
  const slideDown = () => slideTo(600);

  const deleteIcon: JSX.Element = (
    <FontAwesome5 name="backspace" size={24} color="black" />
  );

  const addNumber = (numtext: string) =>
    setText((prev) => (prev === "0" ? numtext : prev + numtext));

  const deleteText = () => {
    setText((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const clearText = () => setText("0");

  const closeModal = () => {
    slideDown();
    setTimeout(() => {
      setIsModal(false);
    }, 800);
  };

  // 혈당 목표치 저장 ( "user" 문서 )
  const saveBloodGoal = () => {
    setBlood((prev) => ({
      ...prev,
      goal: {
        ...prev.goal,
        [title as string]:
          type === "min"
            ? [+text, prev.goal[title as string][1]]
            : [prev.goal[title as string][0], +text],
      },
    }));

    closeModal();
  };

  // 혈당 데이터 저장
  const SaveBloodData = async () => {
    if (typeof title !== "string") return;

    // 1. 몇 주차인지 구하기
    const week = String(getWeek(new Date()));

    // 2. Recoil Atom에 데이터 추가
    if (setBloodData) {
      setBloodData((prev) => {
        const timesArray = userData?.time ?? [];

        if (!prev || !prev.blood) {
          const initialBlood = Object.fromEntries(
            timesArray.map((time) => [time, "0"])
          );
          return {
            blood: { ...initialBlood, [title]: text },
            memo: prev?.memo ?? "",
            week,
          };
        }

        return {
          blood: { ...prev.blood, [title]: text },
          memo: prev.memo ?? "",
          week: prev.week ?? week,
        };
      });
    }

    setIsModal(false);
  };

  return (
    <Pressable style={styles.container} onPress={closeModal}>
      <Animated.View
        style={[
          styles.keyboardContainer,
          { transform: [{ translateY: slide }] },
        ]}
      >
        <Pressable style={styles.noneEventContainer}>
          <View style={styles.titleContainer}>
            <MyText style={texts.title}>혈당을 입력해주세요.</MyText>
          </View>
          <View style={styles.viewContainer}>
            <Text style={texts.view}>{text}</Text>
          </View>
          <View style={styles.keyContainer}>
            <View style={styles.numberContainer}>
              <Keyboard buttonText="1" changeText={addNumber} />
              <Keyboard buttonText="2" changeText={addNumber} />
              <Keyboard buttonText="3" changeText={addNumber} />
            </View>
            <View style={styles.numberContainer}>
              <Keyboard buttonText="4" changeText={addNumber} />
              <Keyboard buttonText="5" changeText={addNumber} />
              <Keyboard buttonText="6" changeText={addNumber} />
            </View>
            <View style={styles.numberContainer}>
              <Keyboard buttonText="7" changeText={addNumber} />
              <Keyboard buttonText="8" changeText={addNumber} />
              <Keyboard buttonText="9" changeText={addNumber} />
            </View>
            <View style={styles.numberContainer}>
              <Keyboard buttonText="C" changeText={clearText} />
              <Keyboard buttonText="0" changeText={addNumber} />
              <Keyboard buttonText={deleteIcon} changeText={deleteText} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[CommonStyle.button, styles.custombutton]}
              onPress={mode === "blood" ? SaveBloodData : saveBloodGoal}
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
    backgroundColor: colors.Sub1,
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
  },
});
