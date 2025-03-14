import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, fonts, MyText } from "../../common";
import Feather from "@expo/vector-icons/Feather";
import { useRecoilValue } from "recoil";
import { ModalData } from "../../atoms/modalData";
import { AntDesign } from "@expo/vector-icons";

type ModalProps = {
  setChoiceModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChoiceModal({ setChoiceModal }: ModalProps) {
  const modalData = useRecoilValue(ModalData);
  const { icon, info, title, action } = modalData;
  const mode =
    icon === "warning" ? (
      <Feather name="alert-circle" size={40} color={colors.Nobel} />
    ) : (
      <AntDesign name="checkcircleo" size={40} color={colors.Main} />
    );

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.iconContainer}>{mode}</View>
        <View style={styles.textContainer}>
          <MyText style={texts.title} fontWeight="Bold">
            {title}
          </MyText>
        </View>
        <View style={styles.textContainer}>
          <MyText style={texts.info}>{info}</MyText>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setChoiceModal(false)}
          >
            <Text>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.okbutton]}
            onPress={() => action?.()}
          >
            <MyText style={texts.ok}>확인</MyText>
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
    height: Platform.OS === "ios" ? 50 : 40,
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
  },

  info: {
    fontSize: fonts.body,
  },

  ok: {
    fontSize: fonts.body,
    color: "#fff",
  },
});
