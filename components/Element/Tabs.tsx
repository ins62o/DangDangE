import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../../pages/Login";
import { colors } from "../../common";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Home from "../../pages/Home";
import More from "../../pages/More";
import { Platform, Pressable, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  // const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   const getToken = async () => {
  //     const tok = await AsyncStorage.getItem("accessToken");
  //     setToken(tok);
  //   };
  //   getToken();
  // }, []);

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
            <FontAwesome
              name="user"
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
