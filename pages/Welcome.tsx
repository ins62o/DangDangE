import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import { colors, CommonStyle, fonts } from "../common";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";

const Character = require("../assets/image/Character.png");

export default function Welcome() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={texts.title}>환영합니다 !</Text>
        <Text style={texts.body}>
          작은 관리가 만드는 큰 변화, 당당이로 시작하세요.
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={Character} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[CommonStyle.button, styles.custom]}
          onPress={() => navigation.navigate("BloodType")}
        >
          <Text style={texts.button}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 0 : 30,
    paddingBottom: Platform.OS === "ios" ? 0 : 60,
  },
  textContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  custom: {
    width: "90%",
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
  body: {
    fontSize: fonts.Subline,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.Sub1,
  },
});
