import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import { colors, fonts } from "../common";
import { StatusBar } from "expo-status-bar";
import BloodCheckBox from "../components/BloodCheckBox";

type RecordBloodRouteProp = RouteProp<StackParamList, "RecordBlood">;

export default function RecordBlood({
  route,
}: {
  route: RecordBloodRouteProp;
}) {
  const date = new Date();
  const { day } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navigate = () => navigation.goBack();
  const today = date.getDay();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayArray = day.dateString.split("-");
  const [y, m, d] = dayArray;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={navigate}
        />
        <AntDesign name="check" size={24} color="black" />
      </View>

      <View style={styles.titleContainer}>
        <Text style={texts.title}>
          {m}월 {d}일 <Text style={texts.day}>{days[today]}요일</Text>
        </Text>
        <Text style={texts.info}>총 10회 측정 | 5회 완료</Text>
      </View>
      <KeyboardAvoidingView style={styles.bloodContainer} behavior="padding">
        <ScrollView>
          <View style={styles.infoColorContainer}>
            <View style={styles.infoBox}>
              <View style={styles.danger}></View>
              <Text style={texts.noti}>초과</Text>
            </View>
            <View style={styles.infoBox}>
              <View style={styles.good}></View>
              <Text style={texts.noti}>정상</Text>
            </View>
          </View>
          <View style={styles.CheckContainer}>
            <BloodCheckBox />
            <BloodCheckBox />
            <BloodCheckBox />
            <BloodCheckBox />
            <BloodCheckBox />
            <BloodCheckBox />
          </View>
          <ScrollView style={styles.inputContainer}>
            <Text style={texts.text}>메모장</Text>
            <TextInput style={styles.textInput} />
          </ScrollView>
        </ScrollView>
      </KeyboardAvoidingView>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },

  headerContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },

  titleContainer: {
    flex: 0.15,
  },

  bloodContainer: {
    flex: 0.8,
    backgroundColor: "#fff",
  },

  infoColorContainer: {
    flex: 0.1,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingTop: 10,
  },

  infoBox: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  danger: {
    width: 15,
    height: 15,
    borderRadius: "100%",
    backgroundColor: colors.Error,
    marginBottom: 5,
  },

  good: {
    width: 15,
    height: 15,
    borderRadius: "100%",
    backgroundColor: colors.Sub1,
    marginBottom: 5,
  },

  CheckContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },

  inputContainer: {
    padding: 10,
  },

  textInput: {
    padding: 10,
    height: 200,
    borderRadius: 8,
    backgroundColor: colors.Sub2,
    paddingBottom: 160,
  },
});

const texts = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: fonts.Headline,
  },
  info: {
    textAlign: "center",
    marginTop: 10,
  },
  day: {
    fontSize: fonts.Subline,
  },

  noti: {
    fontSize: fonts.description,
  },

  text: {
    paddingLeft: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
