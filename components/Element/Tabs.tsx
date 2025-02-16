import { Platform, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../../common";
import Entypo from "@expo/vector-icons/Entypo";
import Home from "../../pages/Home";
import More from "../../pages/More";
import AntDesign from "@expo/vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
        tabBarActiveTintColor: colors.Main,
        tabBarButton: (props: any) => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),
        tabBarStyle: {
          height: Platform.OS === "ios" ? 83 : 55,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => (
            <Entypo
              name="home"
              size={Platform.OS === "ios" ? 24 : 20}
              color={color}
            />
          ),
          tabBarLabelStyle: {
            marginTop: Platform.OS === "ios" ? 5 : 0,
          },
        }}
      />

      <Tab.Screen
        name="More"
        component={More}
        options={{
          title: "더보기",
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="bars"
              size={Platform.OS === "ios" ? 24 : 20}
              color={color}
            />
          ),
          tabBarActiveTintColor: colors.Main,
          tabBarLabelStyle: {
            marginTop: Platform.OS === "ios" ? 5 : 0,
          },
        }}
      />
    </Tab.Navigator>
  );
}
