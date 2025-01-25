import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { CommonStyle, colors, fonts } from "../common";
const Icon = require("../assets/image/LogoIcon.png");

export default function SignUp() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Icon} />
      </View>

      <KeyboardAvoidingView style={BoxStyles.loginBox} behavior="padding">
        <ScrollView style={BoxStyles.scrollBox}>
          <View style={BoxStyles.inputBox}>
            <View style={BoxStyles.marginBox}>
              <Text style={TextStyles.inputInfo}>닉네임</Text>
              <View style={BoxStyles.NickBox}>
                <View style={styles.inputLength}>
                  <TextInput
                    style={CommonStyle.input}
                    autoCapitalize={"none"}
                  />
                </View>
                <View style={styles.buttonLength}>
                  <Pressable
                    style={[
                      CommonStyle.button,
                      { backgroundColor: colors.secondary },
                    ]}
                  >
                    <Text style={TextStyles.NickText}>중복체크</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={BoxStyles.marginBox}>
              <Text style={TextStyles.inputInfo}>아이디</Text>
              <TextInput
                style={CommonStyle.input}
                autoCapitalize={"none"}
                autoCorrect={false}
                spellCheck={false}
                textContentType="none"
              />
            </View>

            <View style={BoxStyles.marginBox}>
              <Text style={TextStyles.inputInfo}>비밀번호</Text>
              <TextInput
                style={CommonStyle.input}
                secureTextEntry
                autoCorrect={false}
                spellCheck={false}
                textContentType="none"
              />
            </View>

            <View style={BoxStyles.marginBox}>
              <Text style={TextStyles.inputInfo}>비밀번호 확인</Text>
              <TextInput
                style={CommonStyle.input}
                secureTextEntry
                autoCorrect={false}
                spellCheck={false}
                textContentType="none"
              />
            </View>

            <View style={BoxStyles.marginBox}>
              <TouchableOpacity
                style={[
                  CommonStyle.button,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={TextStyles.signUpText}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  inputLength: {
    width: "70%",
  },
  buttonLength: {
    width: "25%",
    marginLeft: "5%",
  },
});

const TextStyles = StyleSheet.create({
  inputInfo: {
    alignSelf: "flex-start",
    fontSize: Platform.OS === "android" ? fonts.small : fonts.medium,
  },
  signUpText: {
    color: "#fff",
    textAlign: "center",
    fontSize: Platform.OS === "android" ? fonts.small : fonts.medium,
  },
  NickText: {
    color: "#fff",
    textAlign: "center",
    fontSize: Platform.OS === "android" ? fonts.small : fonts.medium,
  },
});

const BoxStyles = StyleSheet.create({
  scrollBox: {
    flex: 1,
  },
  loginBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.sub,
    borderStyle: "solid",
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: colors.sub,
    paddingTop: 10,
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
  NickBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
});
