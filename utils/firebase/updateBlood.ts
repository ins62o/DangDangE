import { BloodData } from "./../../InitialData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { dateType } from "../../types/dateType";

type BloodType = {
  blood: Record<string, string>;
  memo: string;
  week?: string;
};

type updateProps = {
  day: dateType;
  bloodData: BloodType;
  text: string;
};

export const updateBlood = async ({ day, bloodData, text }: updateProps) => {
  const id = await AsyncStorage.getItem("id");

  const bloodRef = collection(FIRESTORE_DB, "blood");
  const q = query(bloodRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    const docRef = doc(FIRESTORE_DB, "blood", docSnapshot.id);

    const existingData = docSnapshot.data();

    const updatedData = {
      ...existingData,
      [day?.dateString ?? "default_date"]: {
        ...bloodData,
        memo: text,
      },
    };

    await updateDoc(docRef, updatedData);
  }
};
