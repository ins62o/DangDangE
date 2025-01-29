import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import { colors, fonts } from "../common";

type BloodType = {
  id: string;
  title: string;
  info: string;
  offimage: ImageSourcePropType;
  onimage: ImageSourcePropType;
};

type BloodTypeBoxProps = {
  data: BloodType;
  isClicked: boolean;
  onPress: () => void;
};

export default function BloodTypeBox({
  data,
  isClicked,
  onPress,
}: BloodTypeBoxProps) {
  const { title, info, offimage, onimage } = data;
  const dynamicStyle = isClicked ? styles.Onbackground : styles.Offbackground;
  const dynamicText = isClicked ? texts.black : texts.title;
  return (
    <Pressable style={[styles.container, dynamicStyle]} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={isClicked ? onimage : offimage} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={[texts.title, dynamicText]}>{title}</Text>
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={texts.info}>{info}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
    flexDirection: "row",
    padding: 10,
  },
  Onbackground: {
    backgroundColor: colors.Sub2,
    borderColor: colors.Sub2,
  },
  Offbackground: {
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 0.7,
    padding: 5,
  },
  infoTextContainer: {
    paddingTop: 5,
  },
});

const texts = StyleSheet.create({
  title: {
    fontSize: fonts.Headline,
    color: colors.Nobel,
    fontWeight: "bold",
  },

  info: {
    fontSize: fonts.body,
    color: colors.Nobel,
    fontWeight: "bold",
  },

  black: {
    fontSize: fonts.Headline,
    color: "black",
    fontWeight: "bold",
  },
});
