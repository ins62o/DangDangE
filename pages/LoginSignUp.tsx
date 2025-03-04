import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../common";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import Login from "./Login";
import SignUp from "./SignUp";
import OneClickModal from "../components/Modal/OneClickModal";

export default function LoginSignUp() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [mode, setMode] = useState(false);
  const [isOneModal, setIsOneModal] = useState(false);

  const goback = () => {
    mode === false ? navigation.goBack() : setMode(false);
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.closeContainer}>
          <AntDesign name="close" size={24} color="gray" onPress={goback} />
        </View>
        <View style={styles.LogoContainer}>
          <Image
            source={require("../assets/image/LogoIcon.png")}
            style={styles.logo}
          />
        </View>
        {mode ? (
          <SignUp setMode={setMode} setIsOneModal={setIsOneModal} />
        ) : (
          <Login setMode={setMode} setIsOneModal={setIsOneModal} />
        )}
      </SafeAreaView>
      {isOneModal && <OneClickModal setIsOneModal={setIsOneModal} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },

  closeContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },

  LogoContainer: {
    flex: 0.1,
    alignItems: "center",
  },

  logo: {
    height: "100%",
  },

  textContainer: {
    flex: 0.05,
  },

  inputContainer: {
    flex: 0.25,
    alignItems: "center",
  },

  button: {
    width: "80%",
    padding: 15,
    backgroundColor: colors.Main,
    borderRadius: 8,
    marginTop: 15,
  },

  signUpContainer: {
    flex: 0.05,
  },
});
