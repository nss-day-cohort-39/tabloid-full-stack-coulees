import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [comments, setComments] = useState([]);

    const apiUrl = '/api/comment'

    const getAllComments = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setComments));
    };

    const addComment = (comment) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));
    };

    const getComment = (id) =>
        getToken().then((token) =>
            fetch(`/api/comment/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

    const getCommentByPostId = (id) => {
        getToken().then((token) =>
            fetch(`/api/comment/getcommentsbypost/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setComments));
    };

    const editComment = (id, comment) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }));
    };

    const deleteComment = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }));
    };

    return (
        <CommentContext.Provider value={{
            comments, getAllComments, addComment, getComment, getCommentByPostId, editComment, deleteComment
        }}>
            {props.children}
        </CommentContext.Provider>
    );
};