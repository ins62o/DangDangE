import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import BloodHeader from "../components/BloodHeader";
import { colors, CommonStyle, fonts } from "../common";
import TimeButton from "../components/TimeButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";

export default function BloodInfo() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [isClicked, setIsClicked] = useState({
    none: false,
    heal: false,
    in: false,
  });

  const handlePress = (type: "none" | "heal" | "in") => {
    setIsClicked((prev) => {
      if (type === "none") {
        return { none: !prev.none, heal: false, in: false };
      }
      return {
        none: false,
        heal: type === "heal" ? !prev.heal : prev.heal,
        in: type === "in" ? !prev.in : prev.in,
      };
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BloodHeader two={true} />
      <View style={styles.BloodTypeBox}>
        <View style={styles.textContainer}>
          <Text style={texts.title}>혈당을 측정하는 시간이 언제인가요 ?</Text>
          <Text>
            <Text style={texts.point}>측정시간과 치료방법</Text>을 선택해주세요
          </Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={texts.time}>측정 시간</Text>
          <View>
            <TimeButton title={"🌚 식전 혈당(공복)"} />
            <TimeButton title={"🔆 아침 식후 2시간 혈당"} />
            <TimeButton title={"⛅ 점심 식후 2시간 혈당"} />
            <TimeButton title={"🌙 저녁 식후 2시간 혈당"} />
            <TimeButton title={"🛏 취침 전 혈당"} />
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
              onPress={() => handlePress("none")}
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
              onPress={() => handlePress("heal")}
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
              onPress={() => handlePress("in")}
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
          style={[CommonStyle.button, styles.custom]}
          onPress={() => navigation.navigate("BloodGoal")}
        >
          <Text style={texts.button}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 0.55,
    width: "90%",
  },
  healBox: {
    flex: 0.45,
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
    height: 50,
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
});

const texts = StyleSheet.create({
  point: {
    color: colors.Sub1,
    fontWeight: "bold",
  },
  title: {
    fontSize: fonts.Headline,
    fontWeight: "bold",
    marginBottom: 10,
  },
  time: {
    fontSize: fonts.Subline,
    color: colors.DimGrey,
    fontWeight: "bold",
    marginBottom: 15,
  },
  heal: {
    fontSize: fonts.Subline,
    color: colors.DimGrey,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 15,
  },
  button: {
    color: "#fff",
    fontWeight: "bold",
  },
});
