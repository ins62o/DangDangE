import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, CommonStyle, fonts, MyText } from "../common";
import BloodTimeCard from "../components/Card/BloodTimeCard";
import BloodHeader from "../components/Element/BloodHeader";
import { StackParamList } from "../types/stackType";
import { Blood, userBloodData } from "../atoms/bloodData";
import { useRecoilState } from "recoil";
import { times } from "../InitialData";

export default function BloodInfo() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [blood, setBlood] = useRecoilState<Blood>(userBloodData);
  const [isClicked, setIsClicked] = useState({
    none: false,
    heal: false,
    in: false,
  });

  const hasClickedItem = Object.values(isClicked).some((ele) => ele === true);

  // UI 상에서 어떤 옵션이 선택되었는지 확인
  const toggleSelection = (type: "none" | "heal" | "in") => {
    setIsClicked((prev) => {
      if (type === "none") {
        return { none: true, heal: false, in: false };
      }
      return {
        ...prev,
        none: false,
        [type]: !prev[type],
      };
    });
  };

  // 치료방법에 따른 Recoil Atom 업데이트
  const handleHealSelection = (title: string) => {
    if (title === "안함") {
      toggleSelection("none");
      setBlood((prev) => ({
        ...prev,
        heal: [],
      }));
      return;
    }

    toggleSelection(title === "약" ? "heal" : "in");

    setBlood((prev) => ({
      ...prev,
      heal: (prev.heal ?? []).includes(title)
        ? (prev.heal ?? []).filter((item) => item !== title)
        : [...(prev.heal ?? []), title],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <BloodHeader two={true} />
      <View style={styles.BloodTypeBox}>
        <View style={styles.textContainer}>
          <MyText style={texts.title}>
            혈당을 측정하는 시간이 언제인가요 ?
          </MyText>
          <MyText>
            <MyText style={texts.point}>측정시간과 치료방법</MyText>을
            선택해주세요
          </MyText>
        </View>
        <View style={styles.timeBox}>
          <Text style={texts.time}>측정 시간</Text>
          <View>
            {times.map((item, idx) => (
              <BloodTimeCard title={item} key={idx} />
            ))}
          </View>
        </View>

        <View style={styles.healBox}>
          <Text style={texts.heal}>치료 방법</Text>
          <View style={styles.healButton}>
            <Pressable
              style={[
                styles.button,
                isClicked.none ? styles.access : styles.disable,
              ]}
              onPress={() => handleHealSelection("안함")}
            >
              <Text
                style={[
                  styles.title,
                  isClicked.none ? styles.disableText : styles.accessText,
                ]}
              >
                안함
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                isClicked.heal ? styles.access : styles.disable,
              ]}
              onPress={() => handleHealSelection("약")}
            >
              <Text
                style={[
                  styles.title,
                  isClicked.heal ? styles.disableText : styles.accessText,
                ]}
              >
                약
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                isClicked.in ? styles.access : styles.disable,
              ]}
              onPress={() => handleHealSelection("인슐린")}
            >
              <Text
                style={[
                  styles.title,
                  isClicked.in ? styles.disableText : styles.accessText,
                ]}
              >
                인슐린
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            CommonStyle.button,
            blood.time?.length === 0 || !hasClickedItem
              ? styles.uncustom
              : styles.custom,
          ]}
          onPress={() => navigation.navigate("BloodGoal")}
          disabled={blood.time?.length === 0 || !hasClickedItem}
        >
          <MyText style={texts.button}>다음</MyText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 30,
    paddingBottom: Platform.OS === "ios" ? 0 : 60,
  },
  BloodTypeBox: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  timeBox: {
    flex: 0.65,
    width: "90%",
  },

  healBox: {
    flex: 0.35,
    width: "90%",
  },
  button: {
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
    width: 80,
    height: 40,
    justifyContent: "center",
  },
  healButton: {
    flexDirection: "row",
  },
  title: {
    textAlign: "center",
  },
  custom: {
    width: "90%",
    backgroundColor: colors.Sub1,
  },

  buttonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },

  access: {
    backgroundColor: colors.Sub2,
  },

  disable: {
    backgroundColor: "#fff",
  },

  accessText: {
    color: colors.Nobel,
  },

  disableText: {
    color: "black",
  },

  uncustom: {
    width: "90%",
    backgroundColor: colors.Nobel,
  },
});

const texts = StyleSheet.create({
  point: {
    fontFamily: "Pretendard-Bold",
    color: colors.Sub1,
    fontWeight: "bold",
  },

  title: {
    fontSize: fonts.Headline,
    fontWeight: "bold",
    marginBottom: 5,
  },

  time: {
    fontSize: fonts.Subline,
    fontWeight: "bold",
    marginBottom: 15,
  },

  heal: {
    fontSize: fonts.Subline,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 15,
  },
  button: {
    color: "#fff",
    fontWeight: "bold",
  },
});
