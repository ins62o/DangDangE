import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";
const Icon = require("../assets/image/LogoIcon.png");
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  const windowWidth = useWindowDimensions().width;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Icon} />
      </View>
      <KeyboardAvoidingView
        style={styles.loginBox}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={windowWidth > 900 ? 115 : 0}
      >
        <View style={styles.inputBox}>
          <View style={styles.marginBox}>
            <Text style={styles.inputInfo}>아이디</Text>
            <TextInput style={styles.input} autoCapitalize={"none"} />
          </View>

          <View style={styles.marginBox}>
            <Text style={styles.inputInfo}>비밀번호</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCorrect={false}
            />
          </View>

          <View style={styles.marginBox}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.loginText}>로그인</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.TextBox}>
            <Text style={styles.signUp}> 당당이가 처음이라면 ?</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loginBox: {
    flex: 0.7,
    borderWidth: 2,
    borderColor: "#E0ECDE",
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: "#E0ECDE",
  },
  inputBox: {
    flex: 0.6,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  inputInfo: {
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#2C6975",
    width: "100%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
  },
  marginBox: {
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },
  TextBox: {
    marginTop: 60,
  },
  signUp: {
    fontSize: 18,
    color: "#2C6975",
  },
});
