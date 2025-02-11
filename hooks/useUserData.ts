import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { userType } from "../types/userType";

export const useUserData = async (): Promise<userType | null> => {
  const db = getFirestore();
  const userRef = collection(db, "users");
  const id = await AsyncStorage.getItem("id");
  if (!id) return null;

  const q = query(userRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  return querySnapshot.docs[0].data() as userType;
};
