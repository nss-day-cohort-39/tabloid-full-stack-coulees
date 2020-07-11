import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [categories, setCategories] = useState([]);

    const apiUrl = '/api/category'

    const getAllCategory = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCategories));
    };

    const addCategory = (category) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                alert("Name field is required")
            }));
    };

    const getCategory = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }).then((res) => res.json())
        );
    }

    const deleteCategory = (id) =>{
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
        );
    }
    const updateCategory = (category) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${category.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            }));
    };
    

    return (
        <CategoryContext.Provider value={{
            categories, getAllCategory, addCategory, getCategory, deleteCategory, updateCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    );
};