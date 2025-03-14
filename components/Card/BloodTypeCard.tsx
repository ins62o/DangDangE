import { Dispatch, SetStateAction } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  Pressable,
  Platform,
} from "react-native";
import { colors, fonts, MyText } from "../../common";

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
  setTitle: Dispatch<SetStateAction<string>>;
  onPress: () => void;
};

export default function BloodTypeCard({
  data,
  isClicked,
  onPress,
  setTitle,
}: BloodTypeBoxProps) {
  const { title, info, offimage, onimage } = data;
  const dynamicStyle = isClicked ? styles.Onbackground : styles.Offbackground;
  const dynamicText = isClicked ? texts.black : texts.title;

  const updateTitle = () => {
    onPress();
    setTitle(title);
  };

  return (
    <Pressable style={[styles.container, dynamicStyle]} onPress={updateTitle}>
      <View style={styles.imageContainer}>
        <Image source={isClicked ? onimage : offimage} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <MyText fontWeight="Bold" style={[texts.title, dynamicText]}>
            {title}
          </MyText>
        </View>
        <View style={styles.infoTextContainer}>
          <MyText style={texts.info}>{info}</MyText>
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
    padding: Platform.OS === "ios" ? 10 : 5,
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
    fontSize: fonts.Subline,
    color: colors.Nobel,
  },

  info: {
    fontSize: Platform.OS === "ios" ? 15 : 13,
    lineHeight: 15,
    color: colors.Nobel,
  },

  black: {
    fontSize: fonts.Subline,
    color: "black",
  },
});
