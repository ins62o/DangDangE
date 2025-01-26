import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./pages/Splash";
import { StyleSheet } from "react-native";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { colors } from "./common";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RootStack } from "./RootStack";

export default function App() {
  const Navigation = createStaticNavigation(RootStack);

  return <Navigation />;
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.Main,
  },
});
