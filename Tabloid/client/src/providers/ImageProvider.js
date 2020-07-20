import React, { useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const ImageContext = React.createContext();

export const ImageProvider = (props) => {

    const { getToken } = useContext(UserProfileContext)

    const uploadImage = (data) => {
        getToken().then((token) =>
            fetch('/api/image', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data
            }).then(resp => {
                if (resp.ok) {
                    console.log(data);
                    return;
                }
                throw new Error("Something didn't work");
            }));
    };

    return (
        <ImageContext.Provider value={{
            uploadImage
        }}>
            {props.children}
        </ImageContext.Provider>
    );
};