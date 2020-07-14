import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "/api/userprofile";

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const history = useHistory()
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
        setIsLoggedIn(true);
        if (userProfile.userType.name === 'Admin') {
          setIsAdmin(true)
        }
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
        setIsAdmin(false)
      });
  };

  const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then((user) => {
          setUser(user)
          return user
        }));
  };

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      }).then(resp => resp.json()));
  };

  const getAllUsers = () => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
        .then(setUsers));
  };

  const deactivateUser = (user) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/deactivate/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }).then(resp => {
        if (resp.ok) {
          return
        }
        throw new Error("Unauthorized")
      }).then(getAllUsers)
        .then(() => history.push("/users")))
  }

  return (
    <UserProfileContext.Provider value={{
      isLoggedIn, login, logout, register, getUserProfile, user,
      getToken, getAllUsers, users, isAdmin, setIsAdmin, setUser, deactivateUser
    }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </UserProfileContext.Provider>
  );
}