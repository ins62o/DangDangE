import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, fonts, MyText } from "../common";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRecoilValue } from "recoil";
import { userData } from "../Atoms/userData";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../types/stackType";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ChoiceModal from "../components/Modal/ChoiceModal";
import InputModal from "../components/Modal/InputModal";

export default function More() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const user = useRecoilValue(userData);
  const [isModal, setIsModal] = useState(false);
  const [isModalTwo, setIsModalTwo] = useState(false);
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [mode, setMode] = useState("");
  const ischecked = user.nickname === "게스트";

  const configureModal = (title: string, info: string, mode: string) => {
    setIsModal(true);
    setTitle(title);
    setInfo(info);
    setMode(mode);
  };

  const deleteModal = (title: string, info: string, mode: string) => {
    setIsModalTwo(true);
    setTitle(title);
    setInfo(info);
    setMode(mode);
  };

  const login = () => navigation.navigate("LoginSignUp");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <MyText style={texts.nickname}>{user.nickname}</MyText>
        <MyText style={texts.email}>{user.id}</MyText>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              configureModal(
                "혈당 목표치와 시간을 변경하시겠습니까?",
                "기존에 설정한 내용은 사라집니다.",
                "goal"
              )
            }
            disabled={ischecked}
          >
            <Feather
              name="settings"
              size={20}
              color={ischecked ? colors.Nobel : "plum"}
            />
            <MyText style={ischecked ? texts.unmenu : texts.menu}>
              목표치 설정
            </MyText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              deleteModal(
                "서비스를 탈퇴하시겠습니까?",
                "모든 정보가 삭제되고 복구할 수 없습니다.",
                "delete"
              )
            }
            disabled={ischecked}
          >
            <AntDesign
              name="deleteuser"
              size={20}
              color={ischecked ? colors.Nobel : "red"}
            />
            <MyText style={ischecked ? texts.unmenu : texts.menu}>
              회원 탈퇴
            </MyText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={
              ischecked
                ? login
                : () =>
                    configureModal(
                      "로그아웃하시겠습니까?",
                      "로그아웃 시 재 로그인이 필요합니다.",
                      "logout"
                    )
            }
          >
            <AntDesign name="logout" size={20} color="orange" />
            <MyText style={texts.menu}>
              {ischecked ? "로그인" : "로그아웃"}
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
      {isModal && (
        <ChoiceModal
          setIsModal={setIsModal}
          title={title}
          info={info}
          mode={mode}
        />
      )}

      {isModalTwo && (
        <InputModal
          setIsModal={setIsModalTwo}
          info={info}
          title={title}
          mode={mode}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },

  profileContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },

  menuContainer: {
    flex: 0.2,
    alignItems: "center",
  },

  menu: {
    borderRadius: 8,
    flexDirection: "row",
    width: "80%",
  },

  button: {
    flex: 0.34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.WhiteSmoke,
    padding: Platform.OS === "ios" ? 20 : 15,
  },
});

const texts = StyleSheet.create({
  nickname: {
    fontSize: fonts.Headline,
    fontWeight: "bold",
  },

  email: {
    fontSize: fonts.body,
    fontWeight: "bold",
    marginTop: 7,
    color: colors.Main,
  },

  menu: {
    fontSize: fonts.body,
    marginTop: 7,
  },

  unmenu: {
    fontSize: fonts.body,
    marginTop: 7,
    color: colors.Nobel,
  },
});
