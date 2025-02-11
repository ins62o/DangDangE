import { useEffect, useRef } from "react";
import { StyleSheet, Animated, useWindowDimensions, View } from "react-native";
import Logo from "../assets/image/Logo.png";
import { useSetRecoilState } from "recoil";
import { User, userData } from "../Atoms/userData";
import { useUserData } from "../hooks/useUserData";
import { StatusBar } from "expo-status-bar";
import SystemNavigationBar from "react-native-system-navigation-bar";

export default function Splash() {
  const windowWidth = useWindowDimensions().width;
  const opacity = useRef(new Animated.Value(0)).current;
  const setData = useSetRecoilState<User>(userData);

  useEffect(() => {
    const getUser = async () => {
      const user = await useUserData();

      if (user) {
        const formattedUser = {
          id: user.id,
          nickname: user.nickname,
        };
        setData(formattedUser);
      }
    };

    getUser();
  }, []);

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

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Logo}
        style={[{ width: windowWidth * 0.9, opacity }]}
        resizeMode="contain"
      />
      <StatusBar hidden={true} />
    </View>
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
