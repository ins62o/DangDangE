import { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSetRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, CommonStyle, fonts, MyText } from "../common";
import { BloodData } from "../InitialData";
import { Blood, userBloodData } from "../Atoms/bloodData";
import { StackParamList } from "../types/stackType";
import BloodHeader from "../components/Element/BloodHeader";
import BloodTypeCard from "../components/Card/BloodTypeCard";

export default function BloodType() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const setBlood = useSetRecoilState<Blood>(userBloodData);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  // selectedId 상태값 변경
  const toggleSelectedId = (id: string) =>
    setSelectedId((prevId) => (prevId === id ? null : id));

  // Recoil Atom 데이터 추가
  const updateBloodType = () => {
    setBlood((prev) => ({ ...prev, type: title }));
    navigation.navigate("BloodInfo");
  };

  return (
    <SafeAreaView style={styles.container}>
      <BloodHeader one={true} />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <MyText style={texts.title}>어떤 당뇨를 가지고 계신가요?</MyText>
          <MyText style={texts.selectText}>
            <MyText style={texts.point}>당뇨 유형</MyText>을 선택해주세요
          </MyText>
        </View>
        <View style={styles.bloodTypeContainer}>
          {BloodData.map((data) => (
            <View style={styles.typeContainer} key={data.id}>
              <BloodTypeCard
                data={data}
                isClicked={selectedId === data.id}
                onPress={() => toggleSelectedId(data.id)}
                setTitle={setTitle}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            CommonStyle.button,
            selectedId ? styles.custom : styles.uncustom,
          ]}
          onPress={updateBloodType}
          disabled={!selectedId}
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
    backgroundColor: colors.Sub1,
  },

  uncustom: {
    width: "90%",
    backgroundColor: colors.Nobel,
  },
});

const texts = StyleSheet.create({
  button: {
    fontSize: fonts.body,
    color: "#fff",
    fontWeight: "bold",
  },

  title: {
    fontSize: fonts.Headline,
    fontWeight: "bold",
    marginBottom: 5,
  },

  info: {
    fontSize: fonts.Subline,
    fontWeight: "bold",
    marginBottom: 10,
  },

  point: {
    fontSize: fonts.body,
    color: colors.Sub1,
    fontWeight: "bold",
  },

  selectText: {
    fontSize: fonts.body,
  },
});
