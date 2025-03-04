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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userData } from "../atoms/userData";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../types/stackType";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ModalData } from "../atoms/modalData";
import ChoiceModal from "../components/Modal/ChoiceModal";
import InputModal from "../components/Modal/InputModal";
import { homeData } from "../atoms/homeData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function More() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const user = useRecoilValue(userData);
  const ischecked = user.nickname === "게스트";
  const [choiceModal, setChoiceModal] = useState(false);
  const [inputModal, setInputModal] = useState(false);
  const setModal = useSetRecoilState(ModalData);
  const setUser = useSetRecoilState(userData);
  const setHome = useSetRecoilState(homeData);

  // 목표치 설정
  const handleGoal = () => {
    setModal((prev) => ({
      ...prev,
      icon: "warning",
      title: "혈당 목표치와 시간을 변경하시겠습니까?",
      info: "기존에 설정한 내용은 사라집니다.",
      action: () => {
        navigation.navigate("BloodType"), setChoiceModal(false);
      },
    }));
    setChoiceModal(true);
  };

  // 회원 탈퇴
  const deleteUser = () => {
    setModal((prev) => ({
      ...prev,
      title: "서비스를 탈퇴하시겠습니까?",
      info: "모든 정보가 삭제되고 복구할 수 없습니다.",
    }));
    setInputModal(true);
  };

  // 로그인
  const handleLogin = () => navigation.navigate("LoginSignUp");

  // 로그아웃
  const handleLogout = () => {
    setChoiceModal(true);

    const logoutAction = async () => {
      setUser({ id: "로그인이 필요합니다.", nickname: "게스트" });

      setHome({
        markingData: {},
        countDay: 0,
        bloodAvg: 0,
      });

      await AsyncStorage.clear();

      setChoiceModal(false);
      navigation.navigate("Home");
    };

    setModal((prev) => ({
      ...prev,
      icon: "warning",
      title: "로그아웃 하시겠습니까?",
      info: "로그아웃 시 재 로그인이 필요합니다.",
      action: logoutAction,
    }));
  };

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
            disabled={ischecked}
            onPress={handleGoal}
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
            disabled={ischecked}
            onPress={deleteUser}
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
            onPress={ischecked ? handleLogin : handleLogout}
          >
            <AntDesign name="logout" size={20} color="orange" />
            <MyText style={texts.menu}>
              {ischecked ? "로그인" : "로그아웃"}
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
      {choiceModal && <ChoiceModal setChoiceModal={setChoiceModal} />}

      {inputModal && <InputModal setIsModal={setInputModal} />}
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
