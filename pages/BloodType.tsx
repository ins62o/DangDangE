import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors, CommonStyle, fonts } from "../common";
import { BloodData } from "../InitialData";
import { StackParamList } from "../types/stackType";
import BloodTypeBox from "../components/BloodTypeBox";
import BloodHeader from "../components/BloodHeader";

export default function BloodType() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const navigate = () => navigation.navigate("BloodInfo");
  const handlePress = (id: string) =>
    setSelectedId((prevId) => (prevId === id ? null : id));

  return (
    <SafeAreaView style={styles.container}>
      <BloodHeader one={true} />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={texts.title}>어떤 당뇨를 가지고 계신가요?</Text>
          <Text>
            <Text style={texts.point}>당뇨 유형</Text>을 선택해주세요
          </Text>
        </View>
        <View style={styles.bloodTypeContainer}>
          {BloodData.map((data) => (
            <View style={styles.typeContainer} key={data.id}>
              <BloodTypeBox
                data={data}
                isClicked={selectedId === data.id}
                onPress={() => handlePress(data.id)}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[CommonStyle.button, styles.custom]}
          onPress={navigate}
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
  contentContainer: {
    flex: 0.8,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  bloodTypeContainer: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  typeContainer: {
    flex: 0.25,
    width: "90%",
    marginBottom: 20,
  },
  custom: {
    width: "90%",
    height: 50,
    backgroundColor: colors.Sub1,
  },
});

const texts = StyleSheet.create({
  button: {
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: fonts.Headline,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: fonts.Subline,
    fontWeight: "bold",
    marginBottom: 10,
  },
  point: {
    color: colors.Sub1,
    fontWeight: "bold",
  },
});
