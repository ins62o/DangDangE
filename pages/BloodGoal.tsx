import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import BloodHeader from "../components/Element/BloodHeader";
import { colors, CommonStyle, fonts, MyText } from "../common";
import BloodBox from "../components/Card/BloodBox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import KeyboardModal from "../components/Modal/KeyboardModal";
import { useRecoilState } from "recoil";
import { Blood, userBloodData } from "../Atoms/bloodData";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { User, userData } from "../Atoms/userData";

export default function BloodGoal() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [isModal, setIsModal] = useState(false);
  const [blood, setBlood] = useRecoilState<Blood>(userBloodData);
  const [user, setUser] = useRecoilState<User>(userData);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [text, setText] = useState("완료");
  const db = getFirestore();

  const handleEnd = async () => {
    const q = query(collection(db, "users"), where("id", "==", user.id));
    setText("사용자 정보를 만들고 있습니다..");
    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userDocRef = doc(db, "users", userDoc.id);

        await updateDoc(userDocRef, blood);

        navigation.navigate("Tabs");
        setBlood((prev) => ({ ...prev, time: [] }));
      } else {
      }
    } catch (error) {}
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <BloodHeader three={true} />
        <View style={styles.BloodContainer}>
          <View style={styles.textContainer}>
            <MyText style={texts.title}>혈당 목표치를 설정해주세요</MyText>
            <MyText style={texts.Info}>
              <MyText style={texts.point}>당뇨인들의 목표수치</MyText> 를
              알려드릴게요
              {"\n"}
              <MyText style={texts.point}>원하는 목표 수치</MyText>가 있으시면
              직접 설정도 가능해요{"\n"}
              <MyText>
                입력하지 않을 경우{" "}
                <MyText style={texts.point}>기본 설정</MyText>
                으로 세팅됩니다.
              </MyText>
            </MyText>
          </View>

          <View style={styles.contentContainer}>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={100}
            >
              <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
              >
                {blood.time.map((item, idx) => (
                  <BloodBox
                    title={item}
                    key={idx}
                    setIsModal={setIsModal}
                    blood={blood.goal[item]}
                    setTitle={setTitle}
                    setType={setType}
                  />
                ))}
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[CommonStyle.button, styles.custom]}
              onPress={handleEnd}
            >
              <MyText style={texts.button}>{text}</MyText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {isModal && (
        <KeyboardModal setIsModal={setIsModal} title={title} type={type} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  BloodContainer: {
    flex: 0.9,
  },
  textContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 0.8,
    padding: 20,
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  custom: {
    width: "90%",
    height: 50,
    backgroundColor: colors.Sub1,
  },
  scrollContainer: {
    width: "100%",
    height: "100%",
  },
});

const texts = StyleSheet.create({
  point: {
    color: colors.Sub1,
    fontWeight: "bold",
  },

  title: {
    fontSize: fonts.Headline,
    fontWeight: "bold",
    marginBottom: 5,
  },

  Info: {
    fontSize: fonts.body,
    textAlign: "center",
    lineHeight: 20,
  },

  button: {
    color: "#fff",
    fontWeight: "bold",
  },
});
