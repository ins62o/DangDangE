import React from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import MainCalendar from "../components/MainCalendar";
import { colors } from "../common";
import Tabs from "../components/Tabs";

export default function Main() {
  return (
    <View style={styles.container}>
      <Tabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },

  contentContainer: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContainer: {
    width: "90%",
    backgroundColor: colors.WhiteSmoke,
  },
});
