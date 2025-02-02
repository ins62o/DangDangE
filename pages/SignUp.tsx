import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";
import { colors, CommonStyle, fonts } from "../common";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";
import {
  checkId,
  checknickname,
  checkPw,
  checkSamePw,
} from "../utils/SignUp/check";

export default function SignUp() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const auth = FIREBASE_AUTH;
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [isError, setIsError] = useState({
    id: false,
    pw: false,
    pwCheck: false,
    nickname: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    nickname: "",
  });

  const handleSignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, id, pw);
    } catch (err) {
      if (
        err instanceof FirebaseError &&
        err.code === "auth/email-already-in-use"
      ) {
        Alert.alert("알림", "이미 사용중인 이메일입니다.");
      } else {
        Alert.alert("안내", "정보를 입력해주세요");
      }
    }
  };

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
            <TextInput
              style={styles.input}
              placeholder="당당이"
              value={nickname}
              onChangeText={(text) => {
                setNickname(text);
                checknickname(text, setErrorTexts, setIsError);
              }}
              autoCapitalize="none"
            />
            {isError.nickname && (
              <Text style={texts.warning}>{errorTexts.nickname}</Text>
            )}
          </View>

          <View style={CommonStyle.input}>
            <Text style={texts.body}>아이디</Text>
            <TextInput
              style={styles.input}
              placeholder="user@email.com"
              value={id}
              onChangeText={(text) => {
                setId(text);
                checkId(text, setErrorTexts, setIsError);
              }}
              autoCapitalize="none"
              autoComplete="off"
              keyboardType="email-address"
            />
            {isError.id && <Text style={texts.warning}>{errorTexts.id}</Text>}
          </View>

          <View style={CommonStyle.input}>
            <Text style={texts.body}>비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="******"
              value={pw}
              onChangeText={(text) => {
                setPw(text);
                checkPw(text, setErrorTexts, setIsError);
              }}
              secureTextEntry
              textContentType="none"
              autoComplete="off"
            />
            {isError.pw && <Text style={texts.warning}>{errorTexts.pw}</Text>}
          </View>

          <View style={CommonStyle.input}>
            <Text style={texts.body}>비밀번호 확인</Text>
            <TextInput
              style={styles.input}
              placeholder="******"
              value={pwCheck}
              onChangeText={(text) => {
                setPwCheck(text);
                checkSamePw(pw, text, setErrorTexts, setIsError);
              }}
              secureTextEntry
            />
            {isError.pwCheck && (
              <Text style={texts.warning}>{errorTexts.pwCheck}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={CommonStyle.button}
              onPress={handleSignUp}
              disabled={
                isError.id || isError.pw || isError.pwCheck || isError.nickname
              }
            >
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
  warning: {
    fontSize: fonts.body,
    color: colors.Error,
  },
});
