import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { SetterOrUpdater } from "recoil";
import { User } from "../../Atoms/userData";

type deleteProps = {
  setText: React.Dispatch<React.SetStateAction<string>>;
  setUser: SetterOrUpdater<User>;
};

export const deleteUser = async ({ setText, setUser }: deleteProps) => {
  const id = await AsyncStorage.getItem("id");

  // 1. Modal Text 변경
  setText("사용자 정보를 삭제하고 있습니다.");

  // 2. Firebase "users" 컬렉션에서 id가 같은 문서를 찾음
  const userRef = collection(FIRESTORE_DB, "users");
  const userQuery = query(userRef, where("id", "==", id));
  const userSnapshot = await getDocs(userQuery);
  await Promise.all(userSnapshot.docs.map((doc) => deleteDoc(doc.ref)));

  // 3. Firebase "blood" 컬렉션에서 id가 같은 문서를 찾음
  const bloodRef = collection(FIRESTORE_DB, "blood");
  const bloodQuery = query(bloodRef, where("id", "==", id));
  const bloodSnapshot = await getDocs(bloodQuery);
  await Promise.all(bloodSnapshot.docs.map((doc) => deleteDoc(doc.ref)));

  // 4. 현재 로그인 하고 있는 유저 삭제
  const Fireuser = FIREBASE_AUTH.currentUser;
  if (Fireuser) {
    await Fireuser.delete();
  }

  // 5. 로그인 정보 초기화
  await AsyncStorage.clear();
  setUser({ id: "로그인이 필요합니다.", nickname: "게스트" });
};
