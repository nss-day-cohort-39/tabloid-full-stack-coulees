import React, { useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const ImageContext = React.createContext();

export const ImageProvider = (props) => {

    const { getToken } = useContext(UserProfileContext)

    const uploadImage = (data) => {
        return getToken().then((token) =>
            fetch('/api/image', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("The image could not be uploaded.");
            }));
    };

    const deleteImage = (image) => {
        getToken().then((token) =>
            fetch(`/api/image?fileName=${image}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }));
    };

    return (
        <ImageContext.Provider value={{
            uploadImage, deleteImage
        }}>
            {props.children}
        </ImageContext.Provider>
    );
};