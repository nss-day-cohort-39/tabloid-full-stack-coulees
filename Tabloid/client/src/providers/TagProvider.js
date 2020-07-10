import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [tags, setTags] = useState([]);

    const apiUrl = '/api/tag'

    const getAllTags = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setTags));
    };

    const getTag = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

    const addTag = (tag) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tag)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));
    };

    const editTag = (id, tag) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tag)
            }));
    };

    const deleteTag = (id) => {
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
        <TagContext.Provider value={{
            tags, getAllTags, getTag, addTag, editTag, deleteTag
        }}>
            {props.children}
        </TagContext.Provider>
    );
};