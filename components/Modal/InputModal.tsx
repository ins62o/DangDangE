import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, CommonStyle, fonts } from "../../common";
import { StackParamList } from "../../types/stackType";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";
import { userData } from "../../Atoms/userData";
import { useState } from "react";
import { deleteUser } from "../../utils/firebase/deleteUser";
import { homeData } from "../../Atoms/homeData";

type ModalProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  info: string;
  mode: string;
};

export default function InputModal({ setIsModal, title, info }: ModalProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const setUser = useSetRecoilState(userData);
  const setHome = useSetRecoilState(homeData);
  const [infoText, setInfoText] = useState(info);
  const [pw, setPw] = useState("");

  // 회원 탈퇴 : 회원 탈퇴 후 홈 화면 전환
  const deleteAccount = async () => {
    if (!pw) {
      setInfoText("비밀번호를 입력해주세요.");
      return;
    }

    try {
      await deleteUser({ setInfoText, setUser, pw, setHome });
      setIsModal(false);
      navigation.navigate("Home");
    } catch (err) {
      console.error("회원 탈퇴 중 오류 발생", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textContainer}>
          <Text style={texts.title}>{title}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={texts.info}>{infoText}</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[CommonStyle.input, styles.input]}
            secureTextEntry
            placeholder="비밀번호를 입력하세요."
            value={pw}
            onChangeText={setPw}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsModal(false)}
          >
            <Text>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.okbutton]}
            onPress={deleteAccount}
          >
            <Text style={texts.ok}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "90%",
    height: "40%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
  },

  inputContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: "40%",
    height: 50,
    backgroundColor: colors.WhiteSmoke,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  okbutton: {
    backgroundColor: colors.Main,
    marginLeft: 10,
  },

  input: {
    backgroundColor: colors.WhiteSmoke,
  },
});

const texts = StyleSheet.create({
  title: {
    fontSize: fonts.Subline,
    fontWeight: "bold",
  },

  info: {
    fontSize: fonts.body,
  },

  ok: {
    color: "#fff",
  },
});
