import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../../common";
import Feather from "@expo/vector-icons/Feather";
import { StackParamList } from "../../types/stackType";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";
import { userData } from "../../Atoms/userData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { deleteUser } from "../../utils/firebase/deleteUser";

type ModalProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  info: string;
  mode: string;
};

export default function ChoiceModal({
  setIsModal,
  title,
  info,
  mode,
}: ModalProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const setUser = useSetRecoilState(userData);
  const [text, setText] = useState(title);

  // 로그아웃 : 사용자 Atom 변경, 모달 종료, AsyncStorage 값 제거, 홈 화면 전환
  const handleLogout = async () => {
    setUser({ id: "로그인이 필요합니다.", nickname: "게스트" });
    await AsyncStorage.clear();
    setIsModal(false);
    navigation.navigate("Home");
  };

  // 목표치 설정 : 사용자 혈당 정보 입력 페이지로 전환
  const goToGoalSetting = () => navigation.navigate("BloodType");

  // 회원 탈퇴 : 회원 탈퇴 후 홈 화면 전환
  const deleteAccount = async () => {
    try {
      await deleteUser({ setText, setUser });
      setIsModal(false);
      navigation.navigate("Home");
    } catch (err) {
      console.error("회원 탈퇴 중 오류 발생", err);
    }
  };

  // 모드별로 다르게 함수 실행
  const handleModeAction = () => {
    if (mode === "logout") handleLogout();
    if (mode === "goal") goToGoalSetting();
    if (mode === "delete") deleteAccount();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.iconContainer}>
          <Feather name="alert-circle" size={50} color={colors.Nobel} />
        </View>
        <View style={styles.textContainer}>
          <Text style={texts.title}>{text}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={texts.info}>{info}</Text>
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
            onPress={handleModeAction}
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
  },

  iconContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    flex: 0.4,
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
