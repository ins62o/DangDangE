import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Platform,
} from "react-native";
import { colors, CommonStyle, fonts, MyText } from "../common";
import { isNicknameTaken } from "../utils/SignUp/isNicknameTaken";
import { createUser } from "../utils/SignUp/createUser";

type SignProps = {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export default function SignUp({ setMode, setIsModal, setTitle }: SignProps) {
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSignUp = async () => {
    Keyboard.dismiss();
    if (nickname.length === 0) {
      setIsModal(true);
      setTitle("닉네임을 입력해주세요.");
      Keyboard.dismiss();
      return;
    }

    const IdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isChecked = !IdRegex.test(id);

    if (pw.length === 0 && isChecked) {
      setIsModal(true);
      setTitle("이메일 형식에 맞게 입력해주세요.");
      Keyboard.dismiss();
      return;
    }

    if (pw.length < 6) {
      setIsModal(true);
      setTitle("비밀번호를 6자 이상 입력해주세요.");
      Keyboard.dismiss();
      return;
    }

    setLoading(true);

    try {
      if (await isNicknameTaken(nickname)) {
        setIsModal(true);
        setTitle("중복된 닉네임이 있습니다.");
        Keyboard.dismiss();
        return;
      } else {
        await createUser(id, pw, nickname);
        setMode(false);
      }
    } catch (err) {
      setIsModal(true);
      setTitle("회원가입에 실패했습니다.");
      Keyboard.dismiss();
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.textContainer}>
        <MyText style={texts.info}>
          {loading
            ? "회원님의 이메일과 비밀번호를 확인하고 있습니다."
            : "회원가입 후 서비스를 사용해보세요."}
        </MyText>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={CommonStyle.input}
          placeholder="닉네임"
          value={nickname}
          onChangeText={setNickname}
        />
        <TextInput
          style={CommonStyle.input}
          placeholder="아이디"
          value={id}
          onChangeText={setId}
        />
        <TextInput
          style={CommonStyle.input}
          placeholder="비밀번호"
          value={pw}
          onChangeText={setPw}
          secureTextEntry
        />
        <Pressable style={styles.button} onPress={handleSignUp}>
          <MyText style={texts.login}>회원가입</MyText>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 8,
    backgroundColor: colors.Main,
    padding: Platform.OS === "ios" ? 15 : 10,
    marginTop: 10,
  },

  signUpContainer: {
    flex: 0.05,
  },
});

const texts = StyleSheet.create({
  info: {
    fontSize: fonts.body,
    textAlign: "center",
  },

  login: {
    fontSize: fonts.body,
    textAlign: "center",
    color: "#fff",
  },

  signUp: {
    textAlign: "center",
    color: colors.Main,
    fontWeight: "bold",
  },
});
