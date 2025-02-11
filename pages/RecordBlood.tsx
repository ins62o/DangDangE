import React, { memo, useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors, fonts, MyText } from "../common";
import BloodCard from "../components/BloodCard";
import TextCard from "../components/TextCard";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import { useUserData } from "../hooks/useUserData";
import { userType } from "../types/userType";
import KeyboardModal from "../components/KeyboardModal";
import MemoModal from "../components/MemoModal";
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

type RecordBloodProps = {
  route: RouteProp<StackParamList, "RecordBlood">;
};

export interface BloodData {
  blood: Record<string, string>;
  memo: string;
  week: string;
  id?: string;
}

export default function RecordBlood({ route }: RecordBloodProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const date = new Date();
  const today = date.getDate();
  const month = date.getMonth() + 1;
  const day = route.params?.day;

  const [userData, setUserData] = useState<userType | null>(null);
  const [bloodData, setBloodData] = useState<BloodData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isMemo, setIsMemo] = useState(false);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const isBlood = useMemo(() => {
    if (isLoading) return null;

    const bloodKeys = bloodData
      ? Object.keys(bloodData.blood)
      : userData?.time ?? [];

    return bloodKeys.sort((a, b) => times.indexOf(a) - times.indexOf(b));
  }, [bloodData, userData, isLoading]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const id = await AsyncStorage.getItem("id");
      const user = await useUserData();
      setUserData(user);

      try {
        const bloodRef = collection(FIRESTORE_DB, "blood");
        const q = query(bloodRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          const newUserData = { id };
          await addDoc(bloodRef, newUserData);
          setIsLoading(false);
          return;
        }

        for (const userDoc of querySnapshot.docs) {
          const userDocId = userDoc.id;

          const recordRef = doc(FIRESTORE_DB, "blood", userDocId);
          const recordSnap = await getDoc(recordRef);

          if (recordSnap.exists()) {
            const recordData = recordSnap.data();
            const selectedData = day?.dateString
              ? recordData[day.dateString]
              : null;

            setBloodData(selectedData);
            setText(selectedData.memo);
          }
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };

    getData();
  }, [setBloodData]);

  const handleSave = async () => {
    const id = await AsyncStorage.getItem("id");

    const bloodRef = collection(FIRESTORE_DB, "blood");
    const q = query(bloodRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const docRef = doc(FIRESTORE_DB, "blood", docSnapshot.id);

      const existingData = docSnapshot.data();

      const updatedData = {
        ...existingData,
        [day?.dateString ?? "default_date"]: {
          ...bloodData,
          memo: text,
        },
      };

      await updateDoc(docRef, updatedData);
    }

    navigation.navigate("Tabs");
  };

  const bloodStatus = useMemo(() => {
    return isBlood?.map((title) => {
      const [min, max] = (userData?.goal[title] ?? [0, 0]).map(Number);
      let text = "";
      let color = "";

      if (
        bloodData?.blood?.[title] === undefined ||
        bloodData?.blood?.[title] === ""
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

      return { title, text, color, blood: bloodData?.blood?.[title] || "0" };
    });
  }, [bloodData, isBlood, userData]);

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
