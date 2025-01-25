import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  Pressable,
} from "react-native";
const Icon = require("../assets/image/LogoIcon.png");

export default function SignUp() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Icon} />
      </View>
      <View style={Box.loginBox}>
        <View style={Box.inputBox}>
          <View style={Box.marginBox}>
            <Text style={styles.inputInfo}>닉네임</Text>
            <View style={Box.NickBox}>
              <TextInput style={styles.Nickinput} autoCapitalize={"none"} />
              <Pressable style={styles.Nickbutton}>
                <Text style={styles.NickText}>중복체크</Text>
              </Pressable>
            </View>
          </View>

          <View style={Box.marginBox}>
            <Text style={styles.inputInfo}>아이디</Text>
            <TextInput style={styles.input} autoCapitalize={"none"} />
          </View>

          <View style={Box.marginBox}>
            <Text style={styles.inputInfo}>비밀번호</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCorrect={false}
            />
          </View>

          <View style={Box.marginBox}>
            <Text style={styles.inputInfo}>비밀번호 확인</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCorrect={false}
            />
          </View>

          <View style={Box.marginBox}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.loginText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  Nickinput: {
    width: "70%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  Nickbutton: {
    backgroundColor: "#68B2A0",
    width: "25%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    marginLeft: "5%",
  },
  inputInfo: {
    alignSelf: "flex-start",
    fontSize: Platform.OS === "android" ? 10 : 14,
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
    fontSize: Platform.OS === "android" ? 10 : 14,
  },
  signUp: {
    fontSize: Platform.OS === "android" ? 12 : 18,
    color: "#2C6975",
  },
  NickText: {
    color: "#fff",
    textAlign: "center",
  },
});

const Box = StyleSheet.create({
  loginBox: {
    flex: 0.7,
    borderWidth: 2,
    borderColor: "#E0ECDE",
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: "#E0ECDE",
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
