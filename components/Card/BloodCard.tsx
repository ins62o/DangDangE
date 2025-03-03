import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, MyText } from "../../common";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type BloodProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  bloodData?: string;
  blood?: string;
  text: string;
  color: string;
};

export default function BloodCard({
  title,
  blood,
  setIsModal,
  setTitle,
  text,
  color,
}: BloodProps) {
  const handleClick = () => {
    setIsModal(true);
    setTitle(title);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View style={styles.titleContainer}>
        <MyText style={texts.title}>{title}</MyText>
      </View>
      <View style={styles.tagContainer}>
        <Text style={[texts.tag, { color }]}>{text}</Text>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.blood}>
          <MyText style={texts.blood}>{blood ?? 0}</MyText>
          <FontAwesome5 name="plus" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    marginBottom: 10,
  },

  titleContainer: {
    flex: 0.55,
    justifyContent: "center",
    paddingLeft: 20,
  },

  tagContainer: {
    flex: 0.15,
    justifyContent: "center",
  },

  iconContainer: {
    flex: 0.3,
    justifyContent: "center",
  },

  tag: {
    width: 60,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: colors.Nobel,
  },

  blood: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

const texts = StyleSheet.create({
  title: {
    fontSize: fonts.body,
  },

  tag: {
    fontSize: fonts.body,
    fontWeight: "bold",
    color: colors.Nobel,
  },

  blood: {
    fontSize: fonts.Subline,
  },
});
