import { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import Logo from "../assets/image/Logo.png";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";

export default function Splash() {
  const windowWidth = useWindowDimensions().width;
  const opacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Main");
    }, 2500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={Logo}
        style={[{ width: windowWidth * 0.9, opacity }]}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C6975",
    alignItems: "center",
    justifyContent: "center",
  },
});
