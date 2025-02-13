import { collection, getDocs, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userType } from "../../types/userType";
import { FIRESTORE_DB } from "../../firebaseConfig";

export const getUser = async (): Promise<userType | null> => {
  try {
    // 1. AsyncStorage에서 ID 가져오기
    const id = await AsyncStorage.getItem("id");
    if (!id) return null;

    // 2. Firebase "users" 컬렉션에서 문서 데이터 찾기
    const userRef = collection(FIRESTORE_DB, "users");
    const q = query(userRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    // 3. 유저가 존재하지 않으면 null 반환
    if (querySnapshot.empty) return null;

    // 4. 해당 유저의 문서 데이터 반환
    const userDoc = querySnapshot.docs[0];
    return userDoc.data() as userType;
  } catch (err) {
    console.error("유저 데이터 찾는 중 오류 발생", err);
    return null;
  }
};
