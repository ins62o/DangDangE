import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PixelRatio,
  Pressable,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import MainCalendar from "../components/MainCalendar";
import { colors, fonts, MyText } from "../common";
import { StatusBar } from "expo-status-bar";
import { useRecoilValue } from "recoil";
import { userData } from "../Atoms/userData";
import { motivationalMessages } from "../InitialData";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import AntDesign from "@expo/vector-icons/AntDesign";
import InfoModal from "../components/InfoModal";
import { RFValue } from "react-native-responsive-fontsize";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const user = useRecoilValue(userData);
  const random = Math.trunc(Math.random() * 20);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const days = today.getDate();
  const [bloodtext, setBloodtext] = useState("0%");
  const [N, setN] = useState();
  const [isModal, setIsModal] = useState(false);
  const todaydate = `${year}-${String(month).padStart(2, "0")}-${String(
    days
  ).padStart(2, "0")}`;
  const scaledFontSize = (size: number) => {
    return size * PixelRatio.getFontScale();
  };

  const day = {
    dateString: todaydate,
  };

  useEffect(() => {
    const getData = async () => {
      const id = await AsyncStorage.getItem("id");
      const userRef = collection(FIRESTORE_DB, "blood");
      const userQuery = query(userRef, where("id", "==", id));
      const querySnapshot = await getDocs(userQuery);

      const userDataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const userData = userDataArray[0];
      const bloodData = userData[todaydate].blood;

      const blood = Object.values(bloodData);

      if (blood.length > 0) {
        const bloodAvg = (
          (blood.reduce((acc, cur) => acc + Number(cur), 0) / blood.length +
            46.7) /
          28.7
        ).toFixed(1);

        setBloodtext(bloodAvg + "%");
      }
      const keys = Object.keys(userData).filter((key) => key !== "id");

      // 날짜 오름차순 정렬
      const sortedDates = keys.sort((a, b) => new Date(a) - new Date(b));

      let count = 1; // 연속된 날짜 개수
      let maxCount = 1; // 최대로 연속된 날짜 저장

      for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(sortedDates[i - 1]);
        const currentDate = new Date(sortedDates[i]);

        // 이전 날짜 + 1일이 현재 날짜와 같다면 연속된 날짜
        if (currentDate - prevDate === 86400000) {
          count++;
          maxCount = Math.max(maxCount, count);
        } else {
          count = 1; // 연속되지 않으면 초기화
        }
      }

      setN(maxCount);
    };

    getData();
  }, []);

  const windowHeight = useWindowDimensions().height;

  return (
    <SafeAreaView style={styles.container}>
      <MainCalendar />
      <View style={styles.contentContainer}>
        <View style={[styles.content, { height: (windowHeight / 2) * 0.5 }]}>
          <View style={styles.profileContainer}>
            <MyText style={texts.nickname}>
              {user ? user?.nickname : "게스트"}님 환영합니다.
            </MyText>
            <MyText style={texts.badge}>{N}일째 관리 중</MyText>
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
              <TouchableOpacity
                onPress={() => navigation.navigate("RecordBlood", { day })}
              >
                <MyText style={texts.record}>혈당 기록하기</MyText>
              </TouchableOpacity>
            </View>

            <View style={styles.bloodTextContainer}>
              <MyText style={texts.bloodText}>
                오늘 평균 당화혈색소 : {bloodtext}
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
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.WhiteSmoke,
    paddingTop: 40,
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
    position: "absolute",
    right: 0,
    padding: 10,
    fontSize: fonts.description,
  },

  nickname: {
    fontSize: fonts.Subline,
    paddingLeft: 10,
  },

  bloodText: {
    fontSize: fonts.description,
  },

  record: {
    fontWeight: "bold",
  },

  motive: {
    fontSize: fonts.body,
    padding: 10,
  },
});
