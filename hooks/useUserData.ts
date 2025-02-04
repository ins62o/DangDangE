import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export const useUserData = async () => {
  const db = getFirestore();
  const userRef = collection(db, "users");
  const id = await AsyncStorage.getItem("id");
  const q = query(userRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);
  const userData = querySnapshot.docs[0].data();

  return userData;
};
