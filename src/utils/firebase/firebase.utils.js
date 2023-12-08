import { initializeApp } from "firebase/app";
import { getDatabase, push, child, ref } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCk49qlX_lYLyRfLp85cWawzyMNx4hjfWU",
  authDomain: "festival-miramar.firebaseapp.com",
  projectId: "festival-miramar",
  storageBucket: "festival-miramar.appspot.com",
  messagingSenderId: "227608357816",
  appId: "1:227608357816:web:29509a3ecfb40909f23d4d"
};

const firebaseApp = initializeApp(firebaseConfig);

export const database = getDatabase();

export const auth = getAuth();

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const getUserDoc = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  const result = userSnapshot.data();
  return result;
};

export const updateUserDoc = async (userAuth, formField) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  await updateDoc(userDocRef, formField)
}

export const getUserDocs = async () => {
  const usersCollectionRef = collection(db, "users");
  const usersQuerySnapshot = await getDocs(usersCollectionRef);
  const userDocs = [];

  usersQuerySnapshot.forEach((doc) => {
    const userDoc = doc.data();
    userDocs.push(userDoc);
  })

  return userDocs;
}

// export const updateUserCategoryDoc = async (userAuth, checked) => {
//   const userDocRef = doc(db, "users", userAuth.uid);
//   const path = `DATA_CATEGORIES`
//   await updateDoc(userDocRef, {[path]: checked})
// }


// export const updateCat = (userAuth) => {
//   const dbRef = ref(database, 'users/' + userAuth.uid)
//   console.log(dbRef);
// }

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
