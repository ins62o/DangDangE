import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, CommonStyle, fonts } from "../common";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type StackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
};

export default function SignUp() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="#fff"
          style={styles.arrow}
          onPress={() => navigation.goBack()}
        />
        <Text style={texts.title}>회원가입</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.signUpContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View style={CommonStyle.input}>
            <Text style={texts.body}>닉네임</Text>
            <TextInput style={styles.input} placeholder="당당이" />
          </View>

          <View style={CommonStyle.input}>
            <Text style={texts.body}>아이디</Text>
            <TextInput style={styles.input} placeholder="user@email.com" />
          </View>

          <View style={CommonStyle.input}>
            <Text style={texts.body}>비밀번호</Text>
            <TextInput style={styles.input} placeholder="******" />
          </View>

          <View style={CommonStyle.input}>
            <Text style={texts.body}>비밀번호 확인</Text>
            <TextInput style={styles.input} placeholder="******" />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={CommonStyle.button}>
              <Text style={texts.buttonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Main,
    paddingTop: 55,
  },
  titleContainer: {
    flex: 0.12,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpContainer: {
    flex: 0.88,
    backgroundColor: colors.WhiteSmoke,
    borderRadius: 80,
    borderTopEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: "center",
    paddingTop: 50,
  },
  arrow: {
    position: "absolute",
    left: 0,
    paddingLeft: 15,
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
    color: "#fff",
    fontWeight: "bold",
  },
  body: {
    fontSize: fonts.body,
  },
  buttonText: {
    color: "#fff",
  },
});
