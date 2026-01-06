import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userRegister = (formData) => {
    const { email, password } = formData;
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (formData) => {
    const { email, password } = formData;
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result?.user;
      // console.log(user);

      setUser(user);
      toast.success("Login successfull");
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        // console.log("user is logged in");
      } else {
        setUser(null);
        setLoading(false);
        // console.log("user is logged out");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) return <Loader />;

  const value = {
    userRegister,
    userLogin,
    handleGoogleLogin,
    logout,
    setLoading,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
