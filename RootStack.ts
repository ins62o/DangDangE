import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import BloodType from "./pages/BloodType";

export const RootStack = createNativeStackNavigator({
  screens: {
    Splash: {
      screen: Splash,
      options: {
        headerShown: false,
      },
    },

    Login: {
      screen: Login,
      options: {
        headerShown: false,
      },
    },

    SignUp: {
      screen: SignUp,
      options: {
        headerShown: false,
      },
    },

    Welcome: {
      screen: Welcome,
      options: {
        headerShown: false,
      },
    },
    BloodType: {
      screen: BloodType,
      options: {
        headerShown: false,
      },
    },
  },
});
