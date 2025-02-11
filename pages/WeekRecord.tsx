import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../common";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIRESTORE_DB } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function WeekRecord() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.goback}>
        <AntDesign
          name="left"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text>2월 1주차 시간별 혈당을 알려드릴게요</Text>
      </View>
      <View style={styles.recordContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },

  goback: {
    flex: 0.1,
    paddingLeft: 15,
    justifyContent: "center",
  },

  infoContainer: {
    flex: 0.2,
    alignItems: "center",
  },

  recordContainer: {
    flex: 0.7,
    backgroundColor: colors.WhiteSmoke,
  },
});
