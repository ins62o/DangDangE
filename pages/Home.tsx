import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";
import MainCalendar from "../components/Element/MainCalendar";
import { colors, fonts, MyText } from "../common";
import { StatusBar } from "expo-status-bar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userData } from "../atoms/userData";
import { motivationalMessages } from "../InitialData";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import { useEffect, useState } from "react";
import { homeData } from "../atoms/homeData";
import { getHbA1c } from "../utils/firebase/getHbA1c";
import { getTodayDate } from "../utils/dateFn";
import { countDate } from "../utils/firebase/countDate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import InfoModal from "../components/Modal/InfoModal";
import OneClickModal from "../components/Modal/OneClickModal";
import { ModalData } from "../atoms/modalData";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const user = useRecoilValue(userData);
  const setModal = useSetRecoilState(ModalData);
  const [home, setHome] = useRecoilState(homeData);
  const [isModal, setIsModal] = useState(false);
  const [isOneModal, setIsOneModal] = useState(false);
  const [random] = useState(() => Math.trunc(Math.random() * 20));
  const windowHeight = useWindowDimensions().height;
  const today = getTodayDate();
  const day = {
    dateString: today,
  };

  useEffect(() => {
    const getBlood = async () => {
      const id = await AsyncStorage.getItem("id");
      if (!id) return;

      // 1. 오늘 평균 당화혈 색소
      const HbA1c = await getHbA1c(id, today);

      // 2. 현재 사용자의 데이터를 가져와 날짜를 뽑아냄
      const countDay = await countDate(id);

      // 3. Recoil Atom에 해당 bloodAvg를 넣어줌
      setHome((prev) => ({ ...prev, bloodAvg: Number(HbA1c), countDay }));
    };

    getBlood();
  }, []);

  const checkGuestAccess = () => {
    if (user.nickname === "게스트") {
      setIsOneModal(true);
      setModal((prev) => ({
        ...prev,
        icon: "warning",
        title: "로그인이 필요합니다.",
        action: () => setIsOneModal(false),
      }));
    } else {
      navigation.navigate("RecordBlood", { day });
    }
  };

  return (
    <View style={styles.container}>
      <MainCalendar setIsOneModal={setIsOneModal} nickname={user.nickname} />
      <View style={styles.contentContainer}>
        <View style={[styles.content, { height: (windowHeight / 2) * 0.6 }]}>
          <View style={styles.profileContainer}>
            <MyText style={texts.nickname}>
              {user ? user?.nickname : "게스트"}님 환영합니다.
            </MyText>
            <MyText style={texts.badge}>
              {home.countDay ? home.countDay : 0}일째 관리 중
            </MyText>
          </View>

          <View style={styles.paperContainer}>
            <View style={styles.card}>
              <View style={styles.corner} />
              <MyText style={texts.motive}>
                {motivationalMessages[random]}
              </MyText>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.bloodButtonContainer}>
              <TouchableOpacity onPress={checkGuestAccess}>
                <MyText style={texts.record}>혈당 기록하기</MyText>
              </TouchableOpacity>
            </View>

            <View style={styles.bloodTextContainer}>
              <MyText style={texts.today}>
                오늘 평균 당화혈색소 : {home.bloodAvg ? home.bloodAvg : 0}%
              </MyText>
              <AntDesign
                name="questioncircleo"
                size={15}
                color="black"
                style={styles.question}
                onPress={() => setIsModal(true)}
              />
            </View>
          </View>
        </View>
      </View>
      {isModal && <InfoModal setIsModal={setIsModal} />}
      {isOneModal && <OneClickModal setIsOneModal={setIsOneModal} />}
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 60 : 30,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.WhiteSmoke,
  },

  content: {
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  profileContainer: {
    flex: 0.3,
    padding: 10,
    justifyContent: "center",
  },

  paperContainer: {
    flex: 0.4,
    padding: 10,
  },

  card: {
    backgroundColor: colors.Sub2,
    borderRadius: 8,
    justifyContent: "center",
    padding: Platform.OS === "ios" ? 20 : 15,
  },

  corner: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderTopWidth: 16,
    borderLeftWidth: 16,
    borderStyle: "solid",
    borderLeftColor: colors.Main,
    borderTopColor: "#fff",
  },

  buttonContainer: {
    flex: 0.3,
    flexDirection: "row",
  },

  bloodbutton: {
    flex: 0.3,
  },

  bloodTextContainer: {
    flex: 0.6,
    justifyContent: "center",
  },

  bloodButtonContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },

  question: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingRight: 5,
  },
});

const texts = StyleSheet.create({
  badge: {
    fontSize: Platform.OS === "ios" ? 15 : 13,
    position: "absolute",
    right: 0,
    padding: 10,
  },

  nickname: {
    fontSize: fonts.Headline,
    paddingLeft: 10,
  },

  record: {
    fontSize: fonts.body,
    fontWeight: "bold",
  },

  motive: {
    fontSize: fonts.body,
  },

  today: {
    fontSize: Platform.OS === "ios" ? 15 : 13,
  },
});
