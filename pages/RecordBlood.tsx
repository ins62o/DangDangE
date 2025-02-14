import React, { memo, useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors, fonts, MyText } from "../common";
import BloodCard from "../components/Card/BloodCard";
import TextCard from "../components/Card/TextCard";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import { useUserData } from "../hooks/useUserData";
import { userType } from "../types/userType";
import KeyboardModal from "../components/Modal/KeyboardModal";
import MemoModal from "../components/Modal/MemoModal";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkBloodCard from "../skeleton/skBloodCard";
import SkTextCard from "../skeleton/skTextCard";
import { times } from "../InitialData";
import { getUser } from "../utils/firebase/getUser";
import { getBloodData } from "../utils/firebase/getBloodData";
import OneClickModal from "../components/Modal/OneClickModal";
import { updateBlood } from "../utils/firebase/updateBlood";
import { getTodayDate } from "../utils/dateFn";

type RecordBloodProps = {
  route: RouteProp<StackParamList, "RecordBlood">;
};

export type BloodData = {
  blood: Record<string, string>;
  memo: string;
  week: string;
  id?: string;
};

type UserBlood = {
  id: string;
  [key: string]: BloodData | string;
};

export default function RecordBlood({ route }: RecordBloodProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [userData, setUserData] = useState<userType | null>(null);
  const [bloodData, setBloodData] = useState<BloodData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isOneModal, setIsOneModal] = useState(false);
  const [isMemo, setIsMemo] = useState(false);
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const date = new Date();
  const today = date.getDate();
  const month = date.getMonth() + 1;
  const day = route.params?.day;
  const bloodKeys = bloodData
    ? Object.keys(bloodData.blood)
    : userData?.time ?? [];
  const isBlood = bloodKeys.sort((a, b) => times.indexOf(a) - times.indexOf(b));

  useEffect(() => {
    const initialBloodData = async () => {
      const id = await AsyncStorage.getItem("id");
      if (!id) return;

      setIsLoading(true);

      // 1. 유저 데이터 가져옴
      const user = await getUser();
      setUserData(user);

      // 2. 해당 id의 혈당 데이터 가져옴
      const userblood: UserBlood = await getBloodData(id);

      // 3. 유저 데이터가 없으면 새로운 문서 생성
      if (!userblood) {
        await addDoc(collection(FIRESTORE_DB, "blood"), { id });
        setIsLoading(false);
        return;
      }

      // 4. 선택된 날짜의 혈당 데이터 가져옴
      const selectedData =
        day?.dateString && userblood[day.dateString]
          ? userblood[day.dateString]
          : null;

      // 5. 상태 업데이트 (안전성 보장)
      if (selectedData && typeof selectedData !== "string") {
        setBloodData(selectedData);
        setText(selectedData.memo ?? "");
      }

      setIsLoading(false);
    };

    initialBloodData();
  }, [day?.dateString]);

  // 혈당 데이터 저장
  const handleSave = async () => {
    const todayString = getTodayDate();
    const today = new Date(todayString).getTime();

    if (today < (day?.timestamp ?? 0)) {
      setInfo("해당 날짜에 입력해주세요.");
      setIsOneModal(true);
      return;
    } else {
      if (!day || !bloodData) return;

      await updateBlood({ day, bloodData, text });

      setInfo("혈당 입력을 완료했습니다.");
      setIsOneModal(true);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.goback}>
          <AntDesign
            name="left"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <AntDesign
            name="checksquare"
            size={24}
            color={colors.Main}
            onPress={handleSave}
          />
        </View>
        <View style={styles.calendarContainer}>
          <View style={styles.calendar}>
            <View style={styles.calendarTop}>
              <View style={styles.calendarHole}></View>
              <View style={styles.calendarHole}></View>
            </View>
            <View style={styles.monthContainer}>
              <Text style={texts.month}>
                {day?.month ? day?.month : month}월
              </Text>
              <Text style={texts.day}>{day?.day ? day?.day : today}일</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.bloodContainer}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <SkBloodCard key={idx} />
              ))
            : isBlood?.map((title, idx) => {
                const [min, max] = (userData?.goal[title] ?? [0, 0]).map(
                  Number
                );
                let text = "0";
                let color = "";
                if (
                  bloodData?.blood?.[title] === undefined ||
                  bloodData?.blood?.[title] === "0"
                ) {
                  text = "미완료";
                  color = colors.Nobel;
                } else if (+bloodData.blood[title] < min) {
                  text = "저혈당";
                  color = "#0D33B3";
                } else if (+bloodData.blood[title] > max) {
                  text = "초과";
                  color = "#FD004D";
                } else {
                  text = "정상";
                  color = colors.Main;
                }

                return (
                  <BloodCard
                    key={idx}
                    title={title}
                    blood={bloodData?.blood?.[title] || "0"}
                    setIsModal={setIsModal}
                    setTitle={setTitle}
                    text={text}
                    color={color}
                  />
                );
              })}
          {isLoading ? (
            <SkTextCard />
          ) : (
            <TextCard setIsMemo={setIsMemo} memo={text} />
          )}
        </ScrollView>
      </View>

      {isModal && (
        <KeyboardModal
          setIsModal={setIsModal}
          setBloodData={setBloodData}
          mode="blood"
          title={title}
          userData={userData}
        />
      )}

      {isMemo && (
        <MemoModal setIsMemo={setIsMemo} memo={text} changeText={setText} />
      )}

      {isOneModal && (
        <OneClickModal setIsModal={setIsOneModal} title={info} mode="save" />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },

  goback: {
    flex: 0.1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  calendarContainer: {
    flex: 0.3,
    alignItems: "center",
  },

  calendar: {
    borderRadius: 8,
    width: 110,
    height: 110,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  calendarTop: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 5,
  },

  calendarHole: {
    width: 10,
    height: 10,
    backgroundColor: colors.Main,
    borderRadius: "100%",
  },

  monthContainer: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },

  bloodContainer: {
    flex: 1,
    backgroundColor: colors.WhiteSmoke,
    padding: 10,
  },
});

const texts = StyleSheet.create({
  month: {
    fontSize: fonts.Headline,
    color: colors.Main,
    marginBottom: 5,
    fontWeight: "bold",
  },

  day: {
    fontSize: fonts.Subline,
    fontWeight: "bold",
  },
});
