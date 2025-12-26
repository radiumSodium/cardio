"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
            const res = await fetch(`/api/users/${currentUser.uid}`);
            if (res.ok) {
                const data = await res.json();
                setDbUser(data);
            } else if (res.status === 404) {
                 const syncRes = await fetch("/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      firebaseUid: currentUser.uid,
                      email: currentUser.email,
                      name: currentUser.displayName || "User",
                    })
                });
                if (syncRes.ok) {
                    const newUser = await syncRes.json();
                    setDbUser(newUser.user || newUser);
                }
            }
        } catch (error) {
            console.error("Failed to fetch/sync db user", error);
        }
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
        })
    });
  };

  const emailLogin = async (email, pass) => {
     await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerUser = async (email, pass, name) => {
     const result = await createUserWithEmailAndPassword(auth, email, pass);
     await updateProfile(result.user, { displayName: name });
     return result.user;
  };

  const logout = async () => {
    await signOut(auth);
    setDbUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, googleLogin, emailLogin, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
