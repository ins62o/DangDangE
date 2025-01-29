import { StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native";
import { colors, CommonStyle, fonts } from "../common";

export default function BloodBox() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={texts.title}>🌚 식전 혈당(공복)</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.minContainer}>
          <Text style={texts.sub}>최저</Text>
          <TextInput
            style={[CommonStyle.input, styles.inputCustom]}
            placeholder="80mg/dL"
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>
        <View style={styles.maxContainer}>
          <Text style={texts.sub}>최고</Text>
          <TextInput
            style={CommonStyle.input}
            placeholder="130mg/dL"
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.2,
  },
  inputContainer: {
    flexDirection: "row",
  },
  minContainer: {
    flex: 0.3,
  },
  maxContainer: {
    flex: 0.3,
  },
  inputCustom: {},
});

const texts = StyleSheet.create({
  title: {
    fontSize: fonts.Subline,
    color: colors.DimGrey,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sub: {
    marginBottom: 10,
  },
});
