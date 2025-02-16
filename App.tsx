import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecoilRoot } from "recoil";
import Welcome from "./pages/Welcome";
import BloodType from "./pages/BloodType";
import BloodInfo from "./pages/BloodInfo";
import BloodGoal from "./pages/BloodGoal";
import RecordBlood from "./pages/RecordBlood";
import Home from "./pages/Home";
import { StackParamList } from "./types/stackType";
import LoginSignUp from "./pages/LoginSignUp";
import { Text, TextInput } from "react-native";
import { useEffect } from "react";
import * as Font from "expo-font";
import Main from "./pages/Main";

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

// Text 적용 : 시스템 폰트 크기를 무시하고 앱에서 지정한 크기를 사용함.
(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;

// TextInput 적용 : 시스템 폰트 크기를 앱에서 지정
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.otf"),
        "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.otf"),
      });
    }

    loadFonts();
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="LoginSignUp" component={LoginSignUp} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="BloodType" component={BloodType} />
          <Stack.Screen name="BloodInfo" component={BloodInfo} />
          <Stack.Screen name="BloodGoal" component={BloodGoal} />
          <Stack.Screen name="RecordBlood" component={RecordBlood} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
