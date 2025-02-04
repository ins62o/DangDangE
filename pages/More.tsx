import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, CommonStyle, fonts } from "../common";
import { User, userData } from "../Atoms/userData";
import { useRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../types/stackType";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function More() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [data, setData] = useRecoilState<User | null>(userData);
  const handleLogin = () => navigation.navigate("Login");
  const handleLogout = async () => {
    await AsyncStorage.clear();
    setData(null);
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.textContainer}>
          <Text style={texts.login}>
            {data ? data?.nickname : "로그인이 필요합니다."}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[CommonStyle.button, styles.custom]}
            onPress={data ? handleLogout : handleLogin}
          >
            <Text style={texts.button}>{data ? "로그아웃" : "로그인"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.menuContainer}>
        <View style={styles.setting}>
          <Text style={texts.menu}>🕐 목표값 · 시간 설정</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuContainer}>
        <View style={styles.setting}>
          <Text style={texts.menu}>🖐 1 : 1 문의</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuContainer}>
        <View style={styles.setting}>
          <Text style={texts.menu}>⛔ 초기화</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuContainer}>
        <View style={styles.setting}>
          <Text style={texts.menu}>🚫 회원 탈퇴</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loginContainer: {
    flex: 0.1,
    borderBottomWidth: 1,
    borderColor: colors.Sub2,
    flexDirection: "row",
  },

  textContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    flex: 0.2,
    justifyContent: "center",
  },

  custom: {
    backgroundColor: colors.Main,
  },

  menuContainer: {
    flex: 0.25,
    borderBottomWidth: 1,
    borderColor: colors.Sub2,
  },

  setting: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

const texts = StyleSheet.create({
  login: {
    fontSize: fonts.Subline,
  },

  button: {
    color: "#fff",
  },

  menu: {
    fontSize: fonts.Subline,
    marginLeft: 5,
  },
});
