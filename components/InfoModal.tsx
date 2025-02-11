import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, fonts, MyText } from "../common";
import AntDesign from "@expo/vector-icons/AntDesign";
type Modal = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InfoModal({ setIsModal }: Modal) {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textContainer}>
          <Text style={texts.title}>당화혈 색소 기준 (참고용)</Text>
          <Text style={texts.info}>5.6% 이하 → 정상</Text>
          <Text style={texts.info}>5.7% ~ 6.4% → 당뇨 전단계</Text>
          <Text style={texts.info}>6.5% 이상 → 당뇨 가능성 있음</Text>
          <Text style={texts.etc}>
            본 데이터는 하루 평균 혈당을 기반으로 계산된 참고용 수치입니다.
            정확한 당화혈색소(HbA1c) 수치는 2~3개월 동안의 평균 혈당을 반영해야
            합니다.
          </Text>
        </View>
        <AntDesign
          name="close"
          size={20}
          color="black"
          style={styles.close}
          onPress={() => setIsModal(false)}
        />
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
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  modal: {
    width: "80%",
    height: "40%",
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },

  textContainer: {
    width: "80%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  button: {
    width: "80%",
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

  close: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
  },
});

const texts = StyleSheet.create({
  title: {
    fontSize: fonts.Subline,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },

  info: {
    fontSize: fonts.body,
    color: colors.DimGrey,
    textAlign: "center",
  },

  ok: {
    color: "#fff",
  },

  etc: {
    fontSize: fonts.description,
    marginTop: 20,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 10,
  },
});
