import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { colors, CommonStyle, fonts, MyText } from "../common";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserData } from "../hooks/useUserData";
import { useSetRecoilState } from "recoil";
import { User, userData } from "../atoms/userData";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import { useNavigation } from "@react-navigation/native";

type LoginProps = {
  setMode: React.Dispatch<React.SetStateAction<boolean>>; // 로그인 or 회원가입
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>; // 모달 OPEN or CLOSE
  setTitle: React.Dispatch<React.SetStateAction<string>>; // 모달 경고문
};

export default function Login({ setMode, setIsModal, setTitle }: LoginProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const setData = useSetRecoilState<User>(userData);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("로그인 시도중입니다.");
  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    // 1. 키보드 내리고 아이디 패스워드 입력했는지 확인
    Keyboard.dismiss();
    if (id.length === 0) {
      setIsModal(true);
      setTitle("아이디를 입력해주세요.");
      Keyboard.dismiss();
      return;
    }

    if (pw.length === 0) {
      setIsModal(true);
      setTitle("비밀번호를 입력해주세요.");
      Keyboard.dismiss();
      return;
    }

    // 2. 로그인 중 텍스트 출력
    setLoading(true);

    // 3. 파이어베이스 로그인 시도
    try {
      const userCredential = await signInWithEmailAndPassword(auth, id, pw);
      const user = userCredential.user;

      // 4. 유저 id - AsyncStorage 저장
      setText("사용자 정보를 담고 있습니다.");
      await AsyncStorage.setItem("id", id);

      // 5. 파이어베이스에 유저가 있을 시 해당 유저의 데이터 - Recoil Atoms 저장
      if (user) {
        const userdata = await useUserData();
        setData((prev) => ({
          ...prev,
          id: userdata?.id,
          nickname: userdata?.nickname,
        }));

        // 5.1 기존 텍스트로 변경 후 페이지 네비게이션 진행
        setLoading(false);
        userdata?.type
          ? navigation.navigate("Tabs")
          : navigation.navigate("Welcome");
      }
    } catch (err) {
      setTitle("아이디 또는 비밀번호가 일치하지 않습니다.");
      setIsModal(true);
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.textContainer}>
        <MyText style={texts.info}>
          {loading ? text : "로그인 후 서비스를 사용해보세요."}
        </MyText>

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
        <Pressable style={styles.button} onPress={handleLogin}>
          <MyText style={texts.login}>로그인</MyText>
        </Pressable>

        <Pressable style={styles.signUpContainer} onPress={() => setMode(true)}>
          <MyText style={texts.signUp}>당당이가 처음이라면 ?</MyText>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textContainer: {
    flex: 0.5,
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
    marginTop: 20,
  },
});

const texts = StyleSheet.create({
  info: {
    fontSize: fonts.body,
    textAlign: "center",
    marginBottom: 15,
  },

  login: {
    fontSize: fonts.body,
    color: "#fff",
    textAlign: "center",
  },

  signUp: {
    fontSize: fonts.body,
  },
});
