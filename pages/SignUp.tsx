import { useState } from "react";
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
import { isEmailTaken } from "../utils/SignUp/isEmailTaken";
import { ModalData } from "../atoms/modalData";
import { useSetRecoilState } from "recoil";

type SignProps = {
  setMode: React.Dispatch<React.SetStateAction<boolean>>; // 로그인 or 회원가입
  setIsOneModal: React.Dispatch<React.SetStateAction<boolean>>; // 모달 OPEN or CLOSE
};

export default function SignUp({ setMode, setIsOneModal }: SignProps) {
  const setModal = useSetRecoilState(ModalData);
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSignUp = async () => {
    // 1. 키보드 내리고 회원가입 폼 입력여부 검사 시작 (닉네임, 아이디, 비밀번호)
    Keyboard.dismiss();
    if (nickname.length === 0) {
      setIsOneModal(true);
      setModal((prev) => ({
        ...prev,
        icon: "warning",
        title: "닉네임을 입력해주세요.",
        action: () => setIsOneModal(false),
      }));
      return;
    }

    const IdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isChecked = !IdRegex.test(id);

    if (pw.length === 0 && isChecked) {
      setIsOneModal(true);
      setModal((prev) => ({
        ...prev,
        icon: "warning",
        title: "이메일 형식에 맞게 입력해주세요.",
        action: () => setIsOneModal(false),
      }));
      return;
    }

    if (pw.length < 6) {
      setIsOneModal(true);
      setModal((prev) => ({
        ...prev,
        icon: "warning",
        title: "비밀번호를 6자 이상 입력해주세요.",
        action: () => setIsOneModal(false),
      }));
      return;
    }

    // 2. 회원가입 중 텍스트 출력
    setLoading(true);

    // 3. 유저 테이블에 중복된 닉네임과 아이디가 존재하는지 확인
    try {
      if (await isNicknameTaken(nickname)) {
        setIsOneModal(true);
        setLoading(false);
        setModal((prev) => ({
          ...prev,
          icon: "warning",
          title: "중복된 닉네임이 있습니다.",
          action: () => setIsOneModal(false),
        }));
        return;
      } else if (await isEmailTaken(id)) {
        setIsOneModal(true);
        setLoading(false);
        setModal((prev) => ({
          ...prev,
          icon: "warning",
          title: "가입된 아이디가 존재합니다.",
          action: () => setIsOneModal(false),
        }));
        return;
      } else {
        // 4. 모든 유효성 검사에 통과했다면 신규 회원의 유저 테이블 생성
        await createUser(id, pw, nickname);
        setMode(false);
      }
    } catch (err) {
      setModal((prev) => ({
        ...prev,
        icon: "warning",
        title: "회원가입에 실패했습니다.",
        action: () => setIsOneModal(false),
      }));
      setIsOneModal(true);
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
