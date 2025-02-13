import Logo from "../assets/image/Logo.png";
import { useEffect } from "react";
import { StyleSheet, Animated, useWindowDimensions, View } from "react-native";
import { useSetRecoilState } from "recoil";
import { User, userData } from "../Atoms/userData";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";
import { getUser } from "../utils/firebase/getUser";
import { useOpacityAni } from "../hooks/animation/useOpacityAni";

export default function Splash() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const windowWidth = useWindowDimensions().width;
  const opacity = useOpacityAni();
  const setData = useSetRecoilState<User>(userData);

  useEffect(() => {
    const getFetchUser = async () => {
      // 1. AsyncStorage의 id를 가지고 유저의 테이블을 불러옴
      const user = await getUser();

      // 2. 2초라는 시간 동안 Recoil에 유저 데이터를 넣음
      setTimeout(() => {
        if (user) {
          setData((prev) => ({
            ...prev,
            id: user.id,
            nickname: user.nickname,
          }));
        }

        // 3. 조건에 따라 페이지 전환
        if (!user) {
          navigation.navigate("Tabs");
        } else if (!user.type) {
          navigation.navigate("Welcome");
        } else {
          navigation.navigate("Tabs");
        }
      }, 2000);
    };

    getFetchUser();
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
