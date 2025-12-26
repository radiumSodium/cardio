"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "./firebase";

interface AuthContextType {
  user: User | null;
  dbUser: any | null;
  loading: boolean;
  googleLogin: () => Promise<void>;
  emailLogin: (email: string, pass: string) => Promise<void>;
  registerUser: (email: string, pass: string, name: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<any | null>(null); // Replace any with proper User interface
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
            // Fetch user role/data from MongoDB
            // we need an API route for getting user by firebaseUid
            // Let's create a GET endpoint in /api/users/[id] or just query /api/users
            // For now let's assume we can query by firebaseUid
            const res = await fetch(`/api/users/${currentUser.uid}`);
            if (res.ok) {
                const data = await res.json();
                setDbUser(data);
            } else if (res.status === 404) {
                 // User fetch failed (404), try syncing from Firebase
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
    // Sync google user to DB if not exists
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

  const emailLogin = async (email: string, pass: string) => {
     await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerUser = async (email: string, pass: string, name: string) => {
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


