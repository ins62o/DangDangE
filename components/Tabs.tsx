import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Login from "../pages/Login";
import BloodGoal from "../pages/BloodGoal";
import { colors } from "../common";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Home from "../pages/Home";

const Tab = createBottomTabNavigator();

export default function Tabs() {
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
        name="Login"
        component={Login}
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
        name="Home"
        component={Home}
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
