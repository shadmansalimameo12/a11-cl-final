

import { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import axios from 'axios';


export const AuthContext = createContext(null);

// Create Google Auth provider 

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  


  //new user create
  const createUser = (email, password) => {

    setLoading(true); 
    return createUserWithEmailAndPassword(auth, email, password);

  };




  //  sign in an existing user
  const signInUser = (email, password) => {

    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };




  //  sign in with  Google account 

  const signInWithGoogle = () => {

    setLoading(true);
    return signInWithPopup(auth, googleProvider);

  };


  //user proofile update
  const updateUserProfile = (name, photoURL) => {

    return updateProfile(auth.currentUser, {

      displayName: name,
      photoURL: photoURL,

    });

  };




  //  sign out the current user
  const signOutUser = () => {
    setLoading(true);


    //backend e jwt cookie clear
    return axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true })

        .then(() => {
           
            return signOut(auth);

        })

        .catch(error => {

            console.error("Error during server logout:", error);
           return signOut(auth);

        });

  };


  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      
      setUser(currentUser); 
      console.log('Current user state changed:', currentUser?.email || 'No User');
      

      const userEmail = currentUser?.email;
      

      
      if (userEmail) {

        const loggedUserInfo = { email: userEmail };
        


        
        axios.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUserInfo, { withCredentials: true })

          .then(res => {

            if (res.data.success) {

              console.log('Token received and stored successfully.');
              setLoading(false); 

            }

          });




      } else {

        
        axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true })

          .then(() => {

             console.log('User logged out, cookie cleared.');
             setLoading(false); 

          });
      }
    });




   
    return () => {
      return unsubscribe();
    };
  }, []);


  
  const authInfo = {

    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    updateUserProfile,
    signOutUser,

  };



  return (
    <AuthContext.Provider value={authInfo}>

        {children}

    </AuthContext.Provider>

  );
  
};

export default AuthProvider;