import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import BloodHeader from "../components/BloodHeader";
import { colors, CommonStyle, fonts } from "../common";
import BloodBox from "../components/BloodBox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";

export default function BloodGoal() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <BloodHeader three={true} />

      <View style={styles.BloodContainer}>
        <View style={styles.textContainer}>
          <Text style={texts.title}>혈당 목표치를 설정해주세요</Text>
          <Text style={texts.Info}>
            <Text style={texts.point}>정상 수치와 목표 수치</Text> 를
            알려드릴게요
            {"\n"}
            원하는 <Text style={texts.point}>목표 수치</Text>가 있으시면 직접
            설정도 가능해요
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <KeyboardAvoidingView
            style={styles.widthContainer}
            behavior="padding"
            keyboardVerticalOffset={100}
          >
            <ScrollView
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <BloodBox />
              <BloodBox />
              <BloodBox />
              <BloodBox />
              <BloodBox />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[CommonStyle.button, styles.custom]}
            onPress={() => navigation.navigate("BloodGoal")}
          >
            <Text style={texts.button}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BloodContainer: {
    flex: 0.9,
  },
  textContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  custom: {
    width: "90%",
    height: 50,
    backgroundColor: colors.Sub1,
  },
  scrollContainer: {
    width: "100%",
  },
  widthContainer: {
    width: "90%",
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
  Info: {
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    color: "#fff",
    fontWeight: "bold",
  },
});
