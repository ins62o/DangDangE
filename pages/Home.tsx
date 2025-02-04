import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import MainCalendar from "../components/MainCalendar";
import { colors, fonts } from "../common";
import { StatusBar } from "expo-status-bar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useUserData } from "../hooks/useUserData";
import { useRecoilState } from "recoil";
import { User, userData } from "../Atoms/userData";

export default function Home() {
  const [data, setData] = useRecoilState<User>(userData);

  useEffect(() => {
    const getUser = async () => {
      const user = await useUserData();

      if (user) {
        const formattedUser = {
          id: user.id,
          nickname: user.nickname,
        };
        setData(formattedUser);
      }
    };

    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MainCalendar />
      <View style={styles.contentContainer}>
        <View style={styles.ProfileContainer}>
          <View style={styles.Profile}>
            <Text style={texts.name}>{data ? data?.nickname : "게스트님"}</Text>
            <Text style={texts.welcome}>환영합니다</Text>
            <View style={styles.card}>
              <View style={styles.corner} />
              <Text>작은 변화가 큰 건강을 만듭니다. 한 걸음씩 나아가요!</Text>
            </View>
            <Text style={texts.check}> 1일째 관리 중</Text>
          </View>
          <View style={styles.bloodCheckContainer}>
            <TouchableOpacity style={styles.blood}>
              <Text>☀️</Text>
              <Text style={texts.button}>일일 통계</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.blood}>
              <Text>📅</Text>
              <Text style={texts.button}>주간 통계</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blood}>
              <Text>🗓</Text>
              <Text style={texts.button}>월별 통계</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.WhiteSmoke,
    paddingTop: 30,
  },

  scrollContainer: {
    width: "100%",
    backgroundColor: colors.WhiteSmoke,
  },

  ProfileContainer: {
    width: "90%",
    height: "70%",
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  bloodCheckContainer: {
    flex: 0.3,
    flexDirection: "row",
  },

  Profile: {
    flex: 0.7,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 20,
  },

  blood: {
    width: "33.33%",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: colors.Sub2,
    padding: 20,
    borderRadius: 8,
  },

  corner: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderTopWidth: 16,
    borderLeftWidth: 16,
    borderStyle: "solid",
    borderLeftColor: colors.Main,
    borderTopColor: "#fff",
  },
});

const texts = StyleSheet.create({
  name: {
    fontSize: fonts.Headline,
    fontWeight: "bold",
    color: colors.DimGrey,
  },
  welcome: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: fonts.Headline,
    fontWeight: "bold",
    color: colors.DimGrey,
  },

  check: {
    position: "absolute",
    right: 0,
    padding: 20,
  },

  button: {
    marginTop: 5,
  },
});
