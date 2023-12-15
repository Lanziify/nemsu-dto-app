import React, {createContext, useContext, useEffect, useState} from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {auth} from '../../firebase-config';
import {useAuthState} from 'react-firebase-hooks/auth';

const UserAuthContext = createContext();

export function AuthContextProvider({children}) {
  const [user] = useAuthState(auth);
  const [userLoading, setUserLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  class CustomError extends Error {
    constructor(message, code) {
      super(message);
      this.name = 'CustomError';
      this.code = code;
    }
  }

  async function loginUser(email, password) {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      setUserLoading(true);

      const idTokenResult = await credentials.user.getIdTokenResult();

      if (idTokenResult.claims.admin) {
        await signOut(auth);
        throw new CustomError(
          'You are trying to login with an admin account',
          'invalid-login-admin',
        );
      }

      // setUser(credentials.user);
      setUserLoading(false);
    } catch (error) {
      setUserLoading(false);
      throw error;
    }
  }

  async function logoutUser() {
    try {
      setUserLoading(true);
      await auth.signOut();
      setUserLoading(false);
    } catch (error) {
      setUserLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUserLoading(false);
      if (currentUser) {
        currentUser
          .getIdTokenResult()
          .then(idTokenResult => {
            const profileData = idTokenResult;
            setUserToken(profileData);
          })
          .catch(error => {
            console.error('Error fetching user profile:', error);
          });
      } else {
        setUserToken(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const value = {user, userLoading, loginUser, logoutUser, userToken};

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(UserAuthContext);
}
