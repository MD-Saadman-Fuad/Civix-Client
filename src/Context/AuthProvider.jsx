import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from './AuthContext.jsx';
import { auth } from '../Firebase/Firebase.config.js';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password).then((result) => {
            setUser(result.user);
            setLoading(false);
            return result;
        }).catch((error) => {
            setLoading(false);
            throw error;
        });
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password).then((result) => {
            setUser(result.user);
            setLoading(false);
            return result;
        }).catch((error) => {
            setLoading(false);
            throw error;
        });
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider).then((result) => {
            setUser(result.user);
            setLoading(false);
            return result;
        }).catch((error) => {
            setLoading(false);
            throw error;
        });
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUser = (profile) => {
        return updateProfile(auth.currentUser, profile).then(() => {
            setUser({ ...auth.currentUser });
            console.log("User state updated after profile update:", auth.currentUser);
        });
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    // useEffect(() => { }, [])
    // useEffect( () =>{
    //     // step -1: observer set 
    //     // step-2: set in a variable
    //     // step-3: return and call the variable so that you can clear the ref
    // }, [])

    useEffect(() => {
        // set the observer
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log('current user  in auth state change', currentUser)
            setUser(currentUser);
            setLoading(false);
        })
        // clear the observer on unmount
        return () => {
            unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        updateUser,
        resetPassword,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;



