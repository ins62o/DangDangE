import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../common";
import Feather from "@expo/vector-icons/Feather";
import { StackParamList } from "../types/stackType";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { userData } from "../Atoms/userData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { useState } from "react";

type ModalProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  info: string;
  mode: string;
};

export default function Modal({ setIsModal, title, info, mode }: ModalProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [user, setUser] = useRecoilState(userData);
  const auth = getAuth();
  const [text, setText] = useState(title);

  const logout = async () => {
    setUser({ id: "로그인이 필요합니다.", nickname: "게스트" });
    await AsyncStorage.clear();
    setIsModal(false);
    navigation.navigate("Home");
  };

  const goal = () => {
    navigation.navigate("BloodType");
  };

  const deleteUser = async () => {
    const auth = getAuth();
    const id = await AsyncStorage.getItem("id");

    // 🔹 Firestore: users 컬렉션에서 유저 삭제
    const userRef = collection(FIRESTORE_DB, "users");
    const userQuery = query(userRef, where("id", "==", id));
    const userSnapshot = await getDocs(userQuery);
    userSnapshot.forEach(async (docSnap) => {
      await deleteDoc(docSnap.ref);
    });
    setText("사용자 정보를 삭제하고 있습니다.");

    // 🔹 Firestore: blood 컬렉션에서도 유저 데이터 삭제
    const bloodRef = collection(FIRESTORE_DB, "blood");
    const bloodQuery = query(bloodRef, where("id", "==", id));
    const bloodSnapshot = await getDocs(bloodQuery);
    bloodSnapshot.forEach(async (docSnap) => {
      await deleteDoc(docSnap.ref);
    });

    // 🔹 AsyncStorage 데이터 초기화
    await AsyncStorage.clear();
    setUser({ id: "로그인이 필요합니다.", nickname: "게스트" });
    setText("로그인 정보를 삭제하고 있습니다.");

    // 🔹 Firebase Auth 계정 삭제
    const Fireuser = FIREBASE_AUTH.currentUser;
    if (Fireuser) {
      await Fireuser.delete();
    }
    setText("모든 정보가 삭제되었습니다.");
    setIsModal(false);
    navigation.navigate("Home");
  };

  const handleButton = () => {
    if (mode === "logout") logout();
    if (mode === "goal") goal();
    if (mode === "delete") deleteUser();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.iconContainer}>
          <Feather name="alert-circle" size={50} color={colors.Nobel} />
        </View>
        <View style={styles.textContainer}>
          <Text style={texts.title}>{text}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={texts.info}>{info}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsModal(false)}
          >
            <Text>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.okbutton]}
            onPress={handleButton}
          >
            <Text style={texts.ok}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "90%",
    height: "40%",
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  iconContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: "40%",
    height: 50,
    backgroundColor: colors.WhiteSmoke,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  okbutton: {
    backgroundColor: colors.Main,
    marginLeft: 10,
  },
});

const texts = StyleSheet.create({
  title: {
    fontSize: fonts.Subline,
    fontWeight: "bold",
  },

  info: {
    fontSize: fonts.body,
    color: colors.Grey,
  },

  ok: {
    color: "#fff",
  },
});
