import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";

import { colors, CommonStyle, fonts } from "../common";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Logo = require("../assets/image/Logo.png");

type StackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
};

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const windowWidth = useWindowDimensions().width;
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={Logo}
          style={[styles.logo, { width: windowWidth > 900 ? "50%" : "100%" }]}
          resizeMode="cover"
        />
      </View>
      <KeyboardAvoidingView style={styles.loginContainer} behavior="padding">
        <View style={styles.titleContainer}>
          <Text style={texts.title}>로그인</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={CommonStyle.input}>
            <Text style={texts.body}>아이디</Text>
            <TextInput style={styles.input} placeholder="user@email.com" />
          </View>

          <View style={CommonStyle.input}>
            <Text style={texts.body}>비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="******"
              secureTextEntry
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={CommonStyle.button}>
              <Text style={texts.buttonText}>들어가기</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={texts.signUp}
            onPress={() => navigation.navigate("SignUp")}
          >
            당당이가 처음이라면 ?
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Main,
  },
  logoContainer: {
    flex: 0.3,
    paddingTop: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    flex: 0.7,
    backgroundColor: colors.WhiteSmoke,
    borderRadius: 80,
    borderTopEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomStartRadius: 0,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 0.8,
    alignItems: "center",
  },
  input: {
    marginTop: 5,
    height: 40,
    fontSize: fonts.body,
  },
  buttonContainer: {
    width: "80%",
  },
});

const texts = StyleSheet.create({
  title: {
    fontSize: fonts.Headline,
    fontWeight: "bold",
  },
  body: {
    fontSize: fonts.body,
  },
  buttonText: {
    color: "#fff",
    fontSize: fonts.body,
  },
  signUp: {
    fontSize: Platform.OS === "ios" ? fonts.body : fonts.description,
    color: colors.Main,
    fontWeight: 500,
    marginTop: 50,
  },
});
