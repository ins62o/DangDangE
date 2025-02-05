import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecoilRoot } from "recoil";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import BloodType from "./pages/BloodType";
import BloodInfo from "./pages/BloodInfo";
import BloodGoal from "./pages/BloodGoal";
import Main from "./pages/Main";
import RecordBlood from "./pages/RecordBlood";
import Home from "./pages/Home";
import { StackParamList } from "./types/stackType";
import Tabs from "./components/Tabs";

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Tabs" component={Tabs} />
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
