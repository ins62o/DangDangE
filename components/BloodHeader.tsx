import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import { colors } from "../common";
import AntDesign from "@expo/vector-icons/AntDesign";

type MenuType = {
  one?: boolean;
  two?: boolean;
  three?: boolean;
};

export default function BloodHeader({ one, two, three }: MenuType) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navigate = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <AntDesign name="arrowleft" size={24} color="black" onPress={navigate} />
      <View style={styles.buttonContainer}>
        <View style={[styles.button, one ? styles.access : styles.disabled]}>
          <Text style={texts.button}>1</Text>
        </View>
        <View style={[styles.button, two ? styles.access : styles.disabled]}>
          <Text style={texts.button}>2</Text>
        </View>
        <View style={[styles.button, three ? styles.access : styles.disabled]}>
          <Text style={texts.button}>3</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  disabled: {
    backgroundColor: colors.Nobel,
  },
  access: {
    backgroundColor: colors.Sub1,
  },
});

const texts = StyleSheet.create({
  button: {
    color: "#fff",
    fontWeight: "bold",
  },
});
