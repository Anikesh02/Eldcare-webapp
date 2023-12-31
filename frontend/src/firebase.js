import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, doc, getDocs, where, collection, query } from 'firebase/firestore';
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import appointmentsData from "./data/appointments";

const firebaseConfig = {
  apiKey: "AIzaSyBOmxLNfLGGTFefhXGQXZUmsvj-LdrP0oc",
  authDomain: "eldcare-95000.firebaseapp.com",
  projectId: "eldcare-95000",
  storageBucket: "eldcare-95000.appspot.com",
  messagingSenderId: "417899429726",
  appId: "1:417899429726:web:ff5d0ec3b02142916d59cf"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function createUser(name, email, password, photo, gender, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const storageRef = ref(storage, `profile_photos/${userCredential.user.uid}`);
    console.log(photo);

    const snapshot = await uploadBytes(storageRef, photo);
    console.log('Uploaded the file!', snapshot);

    const photoURL = await getDownloadURL(storageRef);
    console.log(photoURL);

    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photoURL
    });

    const customUserData = {
      name: name,
      gender: gender,
      role: role,
      profile: photoURL
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), customUserData);

    return userCredential.user;

  } catch (error) {
    console.error("Error object:", error);

    const errorMessage = error?.message || "An unknown error occurred";
    throw new Error(errorMessage);
  }
}

async function logInUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const errorMessage = error.message;
    console.error("Login failed:", errorMessage);
    return null;
  }
}

async function getAppointmentData(uid) {
  const docRef = collection(db, "appointments");
  console.log(uid);

  var appointmentsData = [];

  const q = query(docRef, where("user", "==", uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    appointmentsData.push(doc.data());
    console.log(doc.id, " => ", doc.data());
  });
  return appointmentsData;
}

async function logOutUser() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export { createUser, logInUser, auth, db, storage, getAppointmentData, logOutUser};
export default app;