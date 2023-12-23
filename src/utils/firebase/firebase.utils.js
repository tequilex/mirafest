import { initializeApp } from "firebase/app";
import { getDatabase, query } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  writeBatch,
  deleteDoc,
  orderBy
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDERID,
  appId: process.env.REACT_APP_APPID
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

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef, orderBy('id', 'asc'));

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const getPackagesAndDocuments = async () => {
  const collectionRef = collection(db, 'packages');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const packageMap = querySnapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();

    return data
  })

  return packageMap;
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

export const sendVerification = async () => {
  await sendEmailVerification(auth.currentUser)
}

export const sendResetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email)
}

export const deleteUserFromDatabaseAndAuth = async (userAuth) => {
  console.log(userAuth);
  const userDocRef = doc(db, "users", userAuth);
  await deleteDoc(userDocRef);

}

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
