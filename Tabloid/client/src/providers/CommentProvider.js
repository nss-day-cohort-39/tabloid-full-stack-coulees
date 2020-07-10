// import React, { useState, useContext } from "react";
// import { UserProfileContext } from "../providers/UserProfileProvider";

// export const CommentContext = React.createContext();

// export const CommentProvider = (props) => {
//     const { getToken } = useContext(UserProfileContext)
//     const [comments, setComments] = useState([]);

//     const apiUrl = '/api/post'

//     const getAllComments = () => {
//         getToken().then((token) =>
//             fetch(apiUrl, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }).then(resp => resp.json())
//                 .then(setPosts));
//     };

//     const addComment = (comment) => {
//         getToken().then((token) =>
//             fetch(apiUrl, {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(comment)
//             }).then(resp => {
//                 if (resp.ok) {
//                     return resp.json();
//                 }
//                 throw new Error("Unauthorized");
//             }));
//     };

//     const getComment = (id) =>
//         getToken().then((token) =>
//             fetch(`/api/post/${id}`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }).then((res) => res.json())
//         );

//     const getPostsByCurrentUser = () => {
//         getToken().then((token) =>
//             fetch(apiUrl + `/currentUser`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }).then(resp => resp.json())
//                 .then(setPosts));
//     };

//     return (
//         <CommentContext.Provider value={{

//         }}>
//             {props.children}
//         </CommentContext.Provider>
//     );
// };