import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
const Icon = require("../assets/image/LogoIcon.png");
import { colors, CommonStyle, fonts } from "../common";

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Icon} />
      </View>
      <View style={Box.loginBox}>
        <View style={Box.inputBox}>
          <View style={Box.marginBox}>
            <Text style={styles.inputInfo}>아이디</Text>
            <TextInput style={CommonStyle.input} autoCapitalize={"none"} />
          </View>

          <View style={Box.marginBox}>
            <Text style={styles.inputInfo}>비밀번호</Text>
            <TextInput
              style={CommonStyle.input}
              secureTextEntry
              autoCorrect={false}
            />
          </View>

          <View style={Box.marginBox}>
            <TouchableOpacity
              style={[CommonStyle.button, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.loginText}>로그인</Text>
            </TouchableOpacity>
          </View>

          <View style={Box.TextBox}>
            <Text style={styles.signUp}> 당당이가 처음이라면 ?</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  inputInfo: {
    alignSelf: "flex-start",
    fontSize: Platform.OS === "android" ? fonts.small : fonts.medium,
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    fontSize: Platform.OS === "android" ? fonts.small : fonts.medium,
  },
  signUp: {
    fontSize: Platform.OS === "android" ? fonts.small : fonts.medium,
    color: colors.primary,
  },
});

const Box = StyleSheet.create({
  loginBox: {
    flex: 0.7,
    borderWidth: 2,
    borderColor: colors.sub,
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: colors.sub,
  },
  marginBox: {
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },
  TextBox: {
    marginTop: 60,
  },
  inputBox: {
    flex: 0.6,
    alignItems: "center",
  },
});
