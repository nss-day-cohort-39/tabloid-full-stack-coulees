import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [posts, setPosts] = useState([]);

    const apiUrl = '/api/post'

    const getAllPosts = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPosts));
    };

    const getPublishedPosts = () => {
        getToken().then((token) =>
            fetch(apiUrl + '/getpublished', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPosts));
    };

    const addPost = (post) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));
    };

    // const searchPosts = (q) => {
    //     if (!q) {
    //         getAllPosts()
    //         return
    //     }
    //     getToken().then((token) =>
    //         fetch(apiUrl + `/search?q=${q}`, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }).then(resp => resp.json())
    //             .then(setPosts));
    // }

    const getPost = (id) =>
        getToken().then((token) =>
            fetch(`/api/post/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

    const getPostsByCurrentUser = () => {
        getToken().then((token) =>
            fetch(apiUrl + `/currentUser`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPosts));
    };

    const getComments = () => {
        getToken().then((token) =>
            fetch(apiUrl + `/comments`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPosts));
    };

    return (
        <PostContext.Provider value={{
            posts, getAllPosts, addPost, getPost, getPostsByCurrentUser, getPublishedPosts, getComments
        }}>
            {props.children}
        </PostContext.Provider>
    );
};