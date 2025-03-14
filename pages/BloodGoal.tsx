import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { colors, CommonStyle, fonts, MyText } from "../common";
import BloodHeader from "../components/Element/BloodHeader";
import KeyboardModal from "../components/Modal/KeyboardModal";
import BloodGoalCard from "../components/Card/BloodGoalCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import { useRecoilValue } from "recoil";
import { Blood, userBloodData } from "../atoms/bloodData";
import { User, userData } from "../atoms/userData";
import { createBloodData } from "../utils/firebase/createBloodData";

export default function BloodGoal() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const bloodData = useRecoilValue<Blood>(userBloodData);
  const user = useRecoilValue<User>(userData);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [text, setText] = useState("완료");
  const [isModal, setIsModal] = useState(false);

  // 유저 테이블 혈당 데이터 업데이트
  const updateUserBloodData = async () => {
    if (!user.id) return;
    setText("사용자 정보를 만들고 있습니다..");
    try {
      await createBloodData(user.id, bloodData);
      navigation.navigate("Tabs");
    } catch (err) {
      setText("혈당 데이터를 만드는 중 오류가 발생했습니다.");
    }
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
                {bloodData.time.map((item, idx) => (
                  <BloodGoalCard
                    title={item}
                    key={idx}
                    setIsModal={setIsModal}
                    blood={bloodData.goal[item]}
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
              onPress={updateUserBloodData}
            >
              <MyText style={texts.button}>{text}</MyText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {isModal && (
        <KeyboardModal setIsModal={setIsModal} type={type} title={title} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 30,
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
    height: Platform.OS === "ios" ? 50 : 45,
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
