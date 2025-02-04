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
  Alert,
  Keyboard,
} from "react-native";

import { useEffect, useState } from "react";
import { colors, CommonStyle, fonts } from "../common";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserData } from "../hooks/useUserData";
import { User, userData } from "../Atoms/userData";
import { useRecoilState } from "recoil";

const Logo = require("../assets/image/Logo.png");

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [data, setData] = useRecoilState<User>(userData);
  const windowWidth = useWindowDimensions().width;
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isError, setIsError] = useState({
    id: false,
    pw: false,
  });

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, id, pw);
      const user = userCredential.user;
      const accessToken = await user.getIdToken();
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("id", id);

      const userdata = await useUserData();

      if (user) {
        const formattedUser = {
          id: userdata.id,
          nickname: userdata.nickname,
        };
        setData(formattedUser);
      }
      Keyboard.dismiss();
      const userObj = await useUserData();
      userObj.hasOwnProperty("type")
        ? navigation.navigate("Main")
        : navigation.navigate("Welcome");
    } catch (error) {
      Alert.alert("알림", "아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

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

            <TextInput
              style={styles.input}
              placeholder="user@email.com"
              value={id}
              onChangeText={setId}
            />
            {isError.id && (
              <Text style={texts.warning}>아이디가 옳지 않습니다.</Text>
            )}
          </View>

          <View style={CommonStyle.input}>
            <Text style={texts.body}>비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="******"
              secureTextEntry
              value={pw}
              onChangeText={setPw}
            />
            {isError.pw && (
              <Text style={texts.warning}>비밀번호가 옳지 않습니다.</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={CommonStyle.button} onPress={handleLogin}>
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
  warning: {
    fontSize: fonts.body,
    color: colors.Error,
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
