import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, fonts } from "../common";

export default function BloodCheckBox() {
  return (
    <View style={styles.box}>
      <View style={styles.textContainer}>
        <Text style={texts.title}>공복 혈당</Text>
      </View>
      <View style={styles.bloodContainer}>
        <Text style={texts.blood}>78</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    width: "44%",
    height: 80,
    margin: 10,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.Sub1,
  },

  textContainer: {
    flex: 0.3,
  },

  bloodContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
});

const texts = StyleSheet.create({
  title: {
    textAlign: "center",
  },

  blood: {
    fontSize: fonts.Headline,
    textAlign: "center",
  },
});
