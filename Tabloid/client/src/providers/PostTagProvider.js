import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [postTags, setPostTags] = useState([]);

    const getAllPostTags = (id) => {
        return getToken().then((token) =>
            fetch(`/api/posttag/getbypostid/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPostTags));
    };

    return (
        <PostTagContext.Provider value={{
            postTags, getAllPostTags
        }}>
            {props.children}
        </PostTagContext.Provider>
    );
};