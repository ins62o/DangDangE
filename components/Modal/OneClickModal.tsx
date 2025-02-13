import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../../common";
import Feather from "@expo/vector-icons/Feather";

type Modal = {
  setIsModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOneModal?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  mode: string;
};

export default function OneClickModal({
  setIsModal,
  setIsOneModal,
  title,
  mode,
}: Modal) {
  const handleModal = () => {
    if (mode === "guest" && setIsOneModal) {
      setIsOneModal(false);
    }

    if (mode === "LoginSignUp" && setIsModal) {
      setIsModal(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.iconContainer}>
          <Feather name="alert-circle" size={50} color={colors.Nobel} />
        </View>
        <View style={styles.textContainer}>
          <Text style={texts.title}>{title}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.okbutton]}
            onPress={handleModal}
          >
            <Text style={texts.ok}>확인</Text>
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
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  modal: {
    width: "80%",
    height: "30%",
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },

  iconContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    width: "80%",
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
});

const texts = StyleSheet.create({
  title: {
    fontSize: fonts.Subline,
    fontWeight: "bold",
    textAlign: "center",
  },

  info: {
    fontSize: fonts.body,
  },

  ok: {
    color: "#fff",
  },
});
