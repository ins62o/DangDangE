import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const createUser = async (id: string, pw: string, nickname: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    FIREBASE_AUTH,
    id,
    pw
  );
  await addDoc(collection(FIRESTORE_DB, "users"), { nickname, id });
  return userCredential;
};
