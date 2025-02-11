import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fonts } from "../common";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type MemoProps = {
  setIsMemo: React.Dispatch<React.SetStateAction<boolean>>;
  memo?: string;
};

export default function TextCard({ setIsMemo, memo }: MemoProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => setIsMemo(true)}>
      <View style={styles.textContainer}>
        <Text style={texts.text}>메모장</Text>
        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={24}
          color="black"
        />
      </View>
      <View style={styles.textViewContainer}>
        <Text style={texts.memo}>
          {memo === "" ? "메모장을 누르고 적어보세요." : memo}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: 300,
    borderRadius: 8,
    padding: 10,
    marginBottom: 30,
  },

  textContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
  },

  textViewContainer: {
    flex: 0.9,
  },
});

const texts = StyleSheet.create({
  text: {
    fontSize: fonts.Subline,
    fontWeight: "bold",
  },

  memo: {
    marginTop: 5,
    fontSize: fonts.content,
  },
});
