import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { colors, CommonStyle, fonts } from "../common";
import { initialBlood } from "../InitialData";
import { useEffect, useState } from "react";

type BloodProps = {
  title: string;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  blood: number[];
};

export default function BloodBox({
  title,
  setIsModal,
  blood,
  setTitle,
  setType,
}: BloodProps) {
  const [bloodmin, bloodmax] = initialBlood[title];
  const handleButton = (type: string) => {
    setIsModal(true);
    setTitle(title);
    setType(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={texts.title}>{title}</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.minContainer}>
          <Text style={texts.sub}>최저</Text>
          <TouchableOpacity
            style={styles.minbutton}
            onPress={() => handleButton("min")}
          >
            <Text>{`${blood[0]}mg/dL`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.maxContainer}>
          <Text style={texts.sub}>최고</Text>
          <TouchableOpacity
            style={styles.minbutton}
            onPress={() => handleButton("max")}
          >
            <Text>{`${blood[1]}mg/dL`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  titleContainer: {
    flex: 0.2,
  },
  inputContainer: {
    flexDirection: "row",
  },
  minContainer: {
    flex: 0.3,
  },
  maxContainer: {
    flex: 0.3,
  },
  minbutton: {
    backgroundColor: "#fff",
    width: "80%",
    height: 35,
    padding: 10,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
});

const texts = StyleSheet.create({
  title: {
    fontSize: fonts.Subline,
    color: colors.DimGrey,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sub: {
    marginBottom: 10,
  },
});
