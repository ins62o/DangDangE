import { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import Logo from "../assets/image/Logo.png";

export default function Splash() {
  const windowWidth = useWindowDimensions().width;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    });

    animation.start();

    return () => {
      animation.stop();
    };
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
