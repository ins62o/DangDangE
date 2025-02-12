import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export const isEmailTaken = async (id: string) => {
  const usersSnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
  const email = usersSnapshot.docs.map((doc) => doc.data().id);

  return email.includes(id);
};
