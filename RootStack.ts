import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import BloodType from "./pages/BloodType";
import BloodInfo from "./pages/BloodInfo";
import BloodGoal from "./pages/BloodGoal";
import KeyboardModal from "./components/KeyboardModal";
import Main from "./pages/Main";
import RecordBlood from "./pages/RecordBlood";
import Home from "./pages/Home";

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
    BloodInfo: {
      screen: BloodInfo,
      options: {
        headerShown: false,
      },
    },
    BloodGoal: {
      screen: BloodGoal,
      options: {
        headerShown: false,
      },
    },
    KeyboardModal: {
      screen: KeyboardModal,
      options: {
        headerShown: false,
      },
    },
    Main: {
      screen: Main,
      options: {
        headerShown: false,
      },
    },
    Home: {
      screen: Home,
      options: {
        headerShown: false,
      },
    },
    RecordBlood: {
      screen: RecordBlood,
      options: {
        headerShown: false,
      },
    },
  },
});
