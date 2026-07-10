import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserRole } from "@/app/lib/types/roles";

const googleProvider = new GoogleAuthProvider();

export const registerUser = async (email: string, password: string, name: string, role: UserRole = 'site-visitor') => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    name: name,
    role: role,
    createdAt: new Date()
  });

  const uid = user.uid;
  const token = await user.getIdToken();
  await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, role ,uid  }),
  });

  return { user, role };
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  const role = userDoc.exists() ? userDoc.data().role : 'site-visitor';

  const token = await user.getIdToken();
  await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, role }),
  });

  return { user, role };
};

export const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const user = userCredential.user;

  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);
  
  let role: UserRole = 'site-visitor'; 

  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      name: user.displayName || "Google User",
      role: role,
      createdAt: new Date()
    });
  } else {
    role = userDoc.data().role;
  }

  const token = await user.getIdToken();
  await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, role }),
  });

  return { user, role };
};

export const logoutUser = async () => {
  await signOut(auth);
  await fetch('/api/auth/session', { method: 'DELETE' });
};