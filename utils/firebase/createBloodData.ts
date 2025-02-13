import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { Blood } from "../../Atoms/bloodData";

export const createBloodData = async (id: string, data: Blood) => {
  const q = query(collection(FIRESTORE_DB, "users"), where("id", "==", id));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userDocRef = doc(FIRESTORE_DB, "users", userDoc.id);
    await updateDoc(userDocRef, data);
  }
};
