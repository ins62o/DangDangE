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
import { signInWithEmailAndPassword } from "firebase/auth";
import { homeType } from "../../Atoms/homeData";

type deleteProps = {
  setInfoText: React.Dispatch<React.SetStateAction<string>>;
  setUser: SetterOrUpdater<User>;
  setHome: SetterOrUpdater<homeType>;
  pw: string;
};

export const deleteUser = async ({
  setInfoText,
  setUser,
  pw,
  setHome,
}: deleteProps) => {
  const auth = FIREBASE_AUTH;
  const id = await AsyncStorage.getItem("id");
  if (!id) return;

  // 1. Modal Text 변경
  setInfoText("사용자 정보를 삭제하고 있습니다.");

  // 2. pw를 가지고 사용자 로그인 → Fireuser를 다시 호출하기 위함
  try {
    await signInWithEmailAndPassword(auth, id, pw);
  } catch (err) {
    setInfoText("비밀번호가 일치하지 않습니다.");
    return;
  }

  // 2. Firebase "users" 컬렉션에서 id가 같은 문서를 찾음
  const userRef = collection(FIRESTORE_DB, "users");
  const userQuery = query(userRef, where("id", "==", id));
  const userSnapshot = await getDocs(userQuery);
  await Promise.all(userSnapshot.docs.map((doc) => deleteDoc(doc.ref)));

  setInfoText("사용자 정보를 삭제하고 있습니다..");

  // 3. Firebase "blood" 컬렉션에서 id가 같은 문서를 찾음
  const bloodRef = collection(FIRESTORE_DB, "blood");
  const bloodQuery = query(bloodRef, where("id", "==", id));
  const bloodSnapshot = await getDocs(bloodQuery);
  await Promise.all(bloodSnapshot.docs.map((doc) => deleteDoc(doc.ref)));

  setInfoText("사용자 정보를 삭제하고 있습니다...");

  // 4. 현재 로그인 하고 있는 유저 삭제
  const Fireuser = FIREBASE_AUTH.currentUser;
  if (Fireuser) {
    await Fireuser.delete();
  }

  // 5. 로그인 정보 초기화
  await AsyncStorage.clear();
  setUser({ id: "로그인이 필요합니다.", nickname: "게스트" });
  setHome({
    markingData: {},
    countDay: 0,
    bloodAvg: 0,
  });
};
