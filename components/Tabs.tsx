import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import Login from "../pages/Login";
import { colors } from "../common";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Home from "../pages/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import More from "../pages/More";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const tok = await AsyncStorage.getItem("accessToken");
      setToken(tok);
    };
    getToken();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.Main,
        headerShown: false,
        tabBarInactiveBackgroundColor: "#fff",
        animation: "fade",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          tabBarActiveTintColor: colors.Main,
          tabBarLabelStyle: {
            marginTop: 5,
          },
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          title: "더보기",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
          tabBarActiveTintColor: colors.Main,
          tabBarLabelStyle: {
            marginTop: 5,
          },
        }}
      />
    </Tab.Navigator>
  );
}
