import React, { useState, useEffect } from 'react';
import { signInWithGoogle, signOut } from '../firebase/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import from Firebase Web SDK
import styles from './sign-in.module.css';
import { User } from 'firebase/auth';
import Image from "next/image";

interface SignInProps {
  user: User | null;
}

const firestore = getFirestore(); // Initialize Firestore using the Firebase App

export default function SignIn({ user }: SignInProps) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (user) {
      const userRef = doc(firestore, 'users', user.uid); // Correct way to reference a document
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setPhotoUrl(userData.photoUrl); // Safely accessing photoUrl only if userData exists
        }
      });
    } else {
      setPhotoUrl(''); // Reset photo URL when user logs out
    }
  }, [user]);

  return (
    <div className={styles.container}>
      {user ? (
        <div>
          {photoUrl && (
            <Image src={photoUrl} alt="User Photo" width={40} height={40} className={styles.photo} />
          )}
          <button className={styles.signin} onClick={signOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <button className={styles.signin} onClick={signInWithGoogle}>
          Sign In
        </button>
      )}
    </div>
  );
}
