import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useHistory } from "react-router-dom";
import { PostTagContext } from "./PostTagProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const { postTags, getAllPostTags } = useContext(PostTagContext)
    const { getToken } = useContext(UserProfileContext)
    const [posts, setPosts] = useState([]);

    const apiUrl = '/api/post'
    const history = useHistory();



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
        return getToken().then((token) =>
            fetch(apiUrl + '/getpublished', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPosts));
    };

    const getPost = (id) => {
        return getToken().then((token) =>
            fetch(`/api/post/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );
    }

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

    const addPost = (post, tags = []) => {
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
            }).then(resp => {
                if (tags.length > 0) {
                    for (const tag of tags) {
                        const postTag = {
                            postid: resp.id,
                            tagid: tag.id
                        }
                        getToken().then((token) =>
                            fetch('api/posttag', {
                                method: "POST",
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(postTag)
                            }));
                    }
                }
                return resp;
            })
                .then(resp => history.push(`/posts/${resp.id}`))
                .then(getAllPosts));
    };

    const deletePost = (id) => {
        getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(resp => {
                if (resp.ok) {
                    return
                }
                else {
                    window.alert("You may not delete a post that is not your own.")
                }
            }).then(() => history.push('/posts')))
    }

    const updatePost = (post, tags) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${post.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Unauthorized");
            })
                .then(resp => { //add the updated tags, old tags are deleted in the controller
                    if (tags.length > 0) {
                        for (const tag of tags) {
                            const postTag = {
                                postid: post.id,
                                tagid: tag.id
                            }
                            getToken().then((token) =>
                                fetch('/api/posttag', {
                                    method: "POST",
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(postTag)
                                }));
                        }
                        return resp;
                    }
                })
                .then(getPost(post.id))
                .then(() => history.push(`/posts/${post.id}`))
                .then(() => { getAllPostTags(post.id); }))
    }

    const searchPosts = (searchString) => {
        getToken().then((token) =>
            fetch(apiUrl + `/search?searchString=${searchString}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setPosts));
    };

    return (
        <PostContext.Provider value={{
            posts, getAllPosts, addPost, getPost, deletePost, post,
            getPostsByCurrentUser, getPublishedPosts, updatePost, searchPosts
        }}>
            {props.children}
        </PostContext.Provider>
    );
};