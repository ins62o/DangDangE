import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export const isNicknameTaken = async (nickanme: string) => {
  const usersSnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
  const nicknames = usersSnapshot.docs.map((doc) => doc.data().nickname);

  return nicknames.includes(nickanme);
};
