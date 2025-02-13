import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export const getBloodData = async (id: string) => {
  const userRef = collection(FIRESTORE_DB, "blood");
  const userQuery = query(userRef, where("id", "==", id));
  const querySnapshot = await getDocs(userQuery);
  const userDataArray = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return userDataArray[0];
};
